import { EventService } from "@/modules/event/event.service";
import { OrderService } from "@/modules/order/order.service";
import { Controller, forwardRef, Get, Inject, Param } from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(
    @Inject(forwardRef(() => OrderService))
    private readonly event: EventService
  ) {}

  @Get(":id/events")
  async findEvents(@Param("id") id: number) {
    return await this.event.findByUserId(id);
  }
}
