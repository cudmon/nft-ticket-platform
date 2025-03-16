import { TicketService } from "@/apps/ticket/ticket.service";
import { Public } from "@/common/decorators/public.decorator";
import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
} from "@nestjs/common";

@Controller("tickets")
export class TicketController {
  constructor(private readonly ticket: TicketService) {}

  @Public()
  @Get()
  async findAll() {
    return await this.ticket.findAll();
  }

  @Public()
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const ticket = await this.ticket.findOneById(id);

    if (!ticket) {
      throw new NotFoundException("Ticket not found");
    }

    return ticket;
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return await this.ticket.delete(id);
  }
}
