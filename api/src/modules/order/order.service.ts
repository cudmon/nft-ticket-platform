import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "@/models/order.entity";
import { UserService } from "@/modules/user/user.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { TicketService } from "@/modules/ticket/ticket.service";
import { abi } from "@nft-ticket/contracts/artifacts/contracts/Event.sol/Event.json";
import {
  Wallet,
  Contract,
  JsonRpcProvider,
  ContractTransactionResponse,
} from "ethers";
import { EventService } from "../event/event.service";

@Injectable()
export class OrderService {
  private PROVIDER: JsonRpcProvider;

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    private readonly user: UserService,
    private readonly ticket: TicketService,
    private readonly config: ConfigService,
    private readonly event: EventService
  ) {
    this.PROVIDER = new JsonRpcProvider(this.config.get("JSON_RPC_URL"));
  }

  async findByUserId(id: number) {
    return await this.orders.find({
      where: {
        user: {
          id: id,
        },
      },
    });
  }

  async createOrder(userId: number, ticketId: number, amount: number) {
    const user = await this.user.findOneById(userId);
    const ticket = await this.ticket.findOneById(ticketId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!ticket) {
      throw new NotFoundException("Ticket not found");
    }

    const order = this.orders.create({
      price: ticket.price * amount,
      amount,
      user,
      ticket,
    });

    const wallet = new Wallet(
      this.config.get("WALLET_PRIVATE_KEY") as string,
      this.PROVIDER
    );

    const event = await this.event.findOneById(ticket.event_id);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    const contract = new Contract(event.address, abi, wallet);

    const res: ContractTransactionResponse = await contract.buy_ticket(
      ticket.id,
      amount,
      user.address
    );

    await res.wait();

    return await this.orders.save(order);
  }
}
