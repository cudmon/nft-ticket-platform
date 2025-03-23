import { EventService } from "@/apps/event/event.service";
import { TicketService } from "@/apps/ticket/ticket.service";
import { ResaleService } from "@/apps/resale/resale.service";
import { Public } from "@/common/decorators/public.decorator";
import { Session } from "@/common/decorators/session.decorator";
import { CreateEvent, UpdateEvent } from "@/apps/event/event.dto";
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

@Controller("events")
export class EventController {
  constructor(
    private readonly event: EventService,
    private readonly ticket: TicketService,
    private readonly resale: ResaleService
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

  @Public()
  @Get(":id/resales")
  async findResales(@Param("id") id: number) {
    return await this.resale.findByEventId(id);
  }

  @Post()
  async createEvent(@Body() data: CreateEvent, @Session() user: Session) {
    const { title } = data;

    const event = await this.event.findOneByTitle(title);

    if (event) {
      throw new ConflictException("Event already exists");
    }

    return await this.event.create(data, user.id);
  }

  @Patch(":id")
  async updateEvent(
    @Param("id") id: number,
    @Body() data: UpdateEvent,
    @Session() user: Session
  ) {
    const event = await this.event.findOneById(id);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    if (event.owner_id !== user.id) {
      throw new ForbiddenException("You are not the owner of this event");
    }

    if (event.published) {
      throw new ForbiddenException("Cannot update published event");
    }

    if (data.published) {
      const tickets = await this.ticket.findByEventId(id);

      if (!tickets.length) {
        throw new ForbiddenException("Cannot publish event without tickets");
      }
    }

    return await this.event.update(id, data);
  }

  @Delete(":id")
  async deleteEvent(@Param("id") id: number, @Session() user: Session) {
    const event = await this.event.findOneById(id);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    if (event.owner_id !== user.id) {
      throw new ForbiddenException("You are not the owner of this event");
    }

    if (event.published) {
      throw new ForbiddenException("Cannot delete published event");
    }

    return await this.event.delete(id);
  }
}
