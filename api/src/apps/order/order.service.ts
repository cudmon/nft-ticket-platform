import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "@/models/order.entity";
import { UserService } from "@/apps/user/user.service";
import { TicketService } from "@/apps/ticket/ticket.service";
import { ContractService } from "@/mods/contract/contract.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    private readonly contract: ContractService,
    private readonly user: UserService,
    private readonly ticket: TicketService
  ) {}

  async createOrder(userId: number, ticketId: number, amount: number) {
    const user = await this.user.findOneById(userId);
    const ticket = await this.ticket.findOneById(ticketId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!ticket) {
      throw new NotFoundException("Ticket not found");
    }

    await this.contract.buyTicket(ticketId, amount, user.address);

    const order = this.orders.create({
      amount,
      user,
    });

    return await this.orders.save(order);
  }
}
