import { EventService } from "@/modules/event/event.service";
import { Controller, forwardRef, Get, Inject, Param } from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(
    @Inject(forwardRef(() => EventService))
    private readonly event: EventService
  ) {}

  @Get(":id/events")
  async findEvents(@Param("id") id: number) {
    return await this.event.findByUserId(id);
  }
}
