import { CreateOrder } from "@/apps/order/order.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "@/apps/order/order.service";
import { Session } from "@/common/decorators/session.decorator";

@Controller("orders")
export class OrderController {
  constructor(private readonly order: OrderService) {}

  @Post()
  async createOrder(@Session() user: Session, @Body() body: CreateOrder) {
    return await this.order.createOrder(user.id, body.ticket_id, body.amount);
  }
}
