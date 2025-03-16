import { OmitType } from "@nestjs/swagger";
import { CreateEvent } from "@/apps/event/event.dto";
import { CreateTicket } from "@/apps/ticket/ticket.dto";
import { EventService } from "@/apps/event/event.service";
import { TicketService } from "@/apps/ticket/ticket.service";
import { Public } from "@/common/decorators/public.decorator";
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
} from "@nestjs/common";

@Controller("events")
export class EventController {
  constructor(
    private readonly event: EventService,
    private readonly ticket: TicketService
  ) {}

  @Public()
  @Get()
  async findAll() {
    return await this.event.findAll();
  }

  @Public()
  @Get(":id")
  async findOne(@Param("id") id: number) {
    const event = await this.event.findOneById(id);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    return event;
  }

  @Public()
  @Get(":id/tickets")
  async findTickets(@Param("id") id: number) {
    return await this.ticket.findByEventId(id);
  }

  @Post()
  async createEvent(@Body() data: CreateEvent) {
    const { title } = data;

    const event = await this.event.findOneByTitle(title);

    if (event) {
      throw new ConflictException("Event already exists");
    }

    return await this.event.create(data);
  }

  @Post(":id/tickets")
  async createTickets(
    @Param("id") id: number,
    @Body(new ParseArrayPipe({ items: OmitType(CreateTicket, ["event_id"]) }))
    data: Omit<CreateTicket, "event_id">[]
  ) {
    const event = await this.event.findOneById(id);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    return await this.ticket.createMany(
      data.map((ticket) => ({ ...ticket, event_id: id }))
    );
  }

  @Patch(":id")
  async updateEvent(@Param("id") id: number, @Body() data: CreateEvent) {
    const event = await this.event.update(id, data);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    return event;
  }

  @Delete(":id")
  async deleteEvent(@Param("id") id: number) {
    const removed = await this.event.delete(id);

    if (!removed) {
      throw new NotFoundException("Event not found");
    }

    return removed;
  }
}
