import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEntity } from "@/models/event.entity";
import { Contract, WebSocketProvider } from "ethers";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateEvent, UpdateEvent } from "@/modules/event/event.dto";
import { abi as fabi } from "@nft-ticket/contracts/artifacts/contracts/Factory.sol/Factory.json";
import { abi as eabi } from "@nft-ticket/contracts/artifacts/contracts/Event.sol/Event.json";
import { TokenEntity } from "@/models/token.entity";
import { OrderEntity } from "@/models/order.entity";
import { ResaleEntity } from "@/models/resale.entity";

@Injectable()
export class EventService implements OnModuleInit {
  private factory: Contract;
  private provider: WebSocketProvider;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(EventEntity)
    private readonly events: Repository<EventEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokens: Repository<TokenEntity>,
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    @InjectRepository(ResaleEntity)
    private readonly resales: Repository<ResaleEntity>
  ) {
    this.provider = new WebSocketProvider(
      this.config.get("JSON_RPC_URL") as string
    );

    this.factory = new Contract(
      this.config.get("CONTRACT_FACTORY_ADDRESS") as string,
      fabi,
      this.provider
    );
  }

  async onModuleInit() {
    await this.listenForNewContracts();
    await this.restoreEventListeners();
  }

  private async listenForNewContracts() {
    this.factory.on("New_Contract", async (id: string, address: string) => {
      await this.events.update(
        {
          id: parseInt(id),
        },
        {
          address,
        }
      );

      this.listenToTicketPurchases(address);
    });
  }

  private async restoreEventListeners() {
    const contracts = await this.events.find();

    contracts.forEach((contract) =>
      this.listenToTicketPurchases(contract.address)
    );
  }

  private listenToTicketPurchases(address: string) {
    const contract = new Contract(address, eabi, this.provider);

    contract.on(
      "Ticket_Resold",
      async (resale_id: number, address: string, price: number) => {
        await this.orders.save(
          this.orders.create({
            resale: {
              id: resale_id,
            },
            address,
            amount: price,
          })
        );
      }
    );

    contract.on(
      "Ticket_Bought",
      async (ticket_id: BigInt, to: string, amount: BigInt) => {
        await this.orders.save(
          this.orders.create({
            ticket: {
              id: Number(ticket_id),
            },
            address: to,
            amount: Number(amount),
          })
        );
      }
    );

    contract.on(
      "Ticket_Minted",
      async (token_id: BigInt, ticket_id: BigInt, to: string) => {
        await this.tokens.save(
          this.tokens.create({
            address: to,
            nft_id: Number(token_id),
            ticket: {
              id: Number(ticket_id),
            },
          })
        );
      }
    );

    contract.on(
      "Ticket_Resell",
      async (
        resale_id: number,
        token_id: number,
        ticket_id: number,
        from: string,
        price: number
      ) => {
        await this.resales.save(
          this.resales.create({
            id: resale_id,
            ticket: {
              id: ticket_id,
            },
            token: {
              id: token_id,
            },
            price,
          })
        );

        await this.tokens.update(
          {
            nft_id: token_id,
          },
          {
            address: from,
          }
        );
      }
    );
  }

  async findAll(published?: boolean): Promise<EventEntity[]> {
    return await this.events.find({
      where: {
        published,
      },
    });
  }

  async findByUserId(id: number): Promise<EventEntity[]> {
    return await this.events.find({
      where: {
        owner_id: id,
      },
    });
  }

  async findOneById(id: number): Promise<EventEntity | null> {
    return await this.events.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByTitle(title: string): Promise<EventEntity | null> {
    return await this.events.findOne({
      where: {
        title,
      },
    });
  }

  async create(event: CreateEvent, userId: number): Promise<EventEntity> {
    return await this.events.save(
      this.events.create({
        ...event,
        owner_id: userId,
      })
    );
  }

  async update(
    id: number,
    event: UpdateEvent & { address?: string }
  ): Promise<EventEntity | null> {
    const found = await this.findOneById(id);

    if (!found) {
      return null;
    }

    await this.events.update({ id }, event);

    return await this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const found = await this.findOneById(id);

    if (!found) {
      return false;
    }

    await this.events.delete({
      id,
    });

    return true;
  }
}

// Add a toJSON method to the BigInt prototype
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};
