import { EventService } from "@/modules/event/event.service";
import { OrderService } from "@/modules/order/order.service";
import { TokenService } from "@/modules/token/token.service";
import { Controller, forwardRef, Get, Inject, Param } from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(
    private readonly event: EventService,
    @Inject(forwardRef(() => OrderService))
    private readonly order: OrderService,
    private readonly token: TokenService
  ) {}

  @Get(":id/events")
  async findEvents(@Param("id") id: number) {
    return await this.event.findByUserId(id);
  }

  @Get(":id/orders")
  async findOrders(@Param("id") id: number) {
    return await this.order.findByUserId(id);
  }

  @Get(":id/tokens")
  async findTokens(@Param("id") id: number) {
    return await this.token.findByUserId(id);
  }
}
