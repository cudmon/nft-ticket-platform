import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "@/models/order.entity";
import { UserService } from "@/apps/user/user.service";
import { TicketService } from "@/apps/ticket/ticket.service";
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly user: UserService,
    private readonly ticket: TicketService
  ) {}

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
    });

    return await this.orders.save(order);
  }
}
