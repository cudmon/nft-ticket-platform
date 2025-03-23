import { TicketService } from "@/apps/ticket/ticket.service";
import { CreateTicket, UpdateTicket } from "@/apps/ticket/ticket.dto";
import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

@Controller("tickets")
export class TicketController {
  constructor(private readonly ticket: TicketService) {}

  @Post()
  async create(@Body() data: CreateTicket) {
    return this.ticket.create(data);
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() data: UpdateTicket) {
    const ticket = await this.ticket.update(id, data);

    if (!ticket) {
      throw new NotFoundException("ticket not found");
    }

    return ticket;
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return await this.ticket.delete(id);
  }
}
