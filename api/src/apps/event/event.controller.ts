import { CreateEvent } from "@/apps/event/event.dto";
import { EventService } from "@/apps/event/event.service";
import { TicketService } from "@/apps/ticket/ticket.service";
import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Post,
} from "@nestjs/common";
import { CreateTicket } from "../ticket/ticket.dto";
import { OmitType } from "@nestjs/swagger";

@Controller("events")
export class EventController {
  constructor(
    private readonly event: EventService,
    private readonly ticket: TicketService
  ) {}

  @Get()
  async findAll() {
    return await this.event.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    const event = await this.event.findOneById(id);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    return event;
  }

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
}
