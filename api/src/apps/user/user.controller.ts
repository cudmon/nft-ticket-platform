import { UserService } from "@/apps/user/user.service";
import { EventService } from "@/apps/event/event.service";
import { OrderService } from "@/apps/order/order.service";
import { Controller, forwardRef, Get, Inject, Param } from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly event: EventService,
    @Inject(forwardRef(() => OrderService))
    private readonly order: OrderService
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.user.findOneById(id);
  }

  @Get(":id/events")
  async findEvents(@Param("id") id: number) {
    return await this.event.findByUserId(id);
  }

  @Get(":id/orders")
  async findOrders(@Param("id") id: number) {
    return await this.order.findByUserId(id);
  }
}
