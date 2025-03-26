import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketEntity } from "@/models/ticket.entity";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { EventService } from "@/modules/event/event.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTicket, UpdateTicket } from "@/modules/ticket/ticket.dto";
import { abi } from "@nft-ticket/contracts/artifacts/contracts/Event.sol/Event.json";

@Injectable()
export class TicketService {
  private PROVIDER: JsonRpcProvider;

  constructor(
    @InjectRepository(TicketEntity)
    private readonly tickets: Repository<TicketEntity>,
    private readonly event: EventService,
    private readonly config: ConfigService
  ) {
    this.PROVIDER = new JsonRpcProvider(this.config.get("JSON_RPC_URL"));
  }

  async findAll(): Promise<TicketEntity[]> {
    return this.tickets.find();
  }

  async findOneById(id: number): Promise<TicketEntity | null> {
    return this.tickets.findOne({
      where: {
        id,
      },
    });
  }

  async findByEventId(id: number): Promise<TicketEntity[]> {
    return this.tickets.find({
      where: {
        event: {
          id,
        },
      },
    });
  }

  async create(data: CreateTicket): Promise<TicketEntity> {
    const event = await this.event.findOneById(data.event_id);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    const wallet = new Wallet(
      this.config.get("WALLET_PRIVATE_KEY") as string,
      this.PROVIDER
    );

    const contract = new Contract(event.address, abi, wallet);

    const ticket = await this.tickets.save(this.tickets.create(data));

    const res = await contract.add_ticket(
      ticket.id,
      ticket.total,
      ticket.price,
      ticket.resalable
    );

    await res.wait();

    return ticket;
  }

  async update(id: number, data: UpdateTicket): Promise<TicketEntity | null> {
    const found = await this.findOneById(id);

    if (!found) {
      return null;
    }

    await this.tickets.update({ id }, data);

    return await this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const found = await this.findOneById(id);

    if (!found) {
      return false;
    }

    await this.tickets.delete({
      id,
    });

    return true;
  }
}
