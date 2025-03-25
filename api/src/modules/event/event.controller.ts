import { ConfigService } from "@nestjs/config";
import { EventService } from "@/modules/event/event.service";
import { Public } from "@/common/decorators/public.decorator";
import { TicketService } from "@/modules/ticket/ticket.service";
import { ResaleService } from "@/modules/resale/resale.service";
import { Session } from "@/common/decorators/session.decorator";
import { Contract, ContractFactory, JsonRpcProvider, Wallet } from "ethers";
import { CreateEvent, UpdateEvent } from "@/modules/event/event.dto";
import { abi } from "@nft-ticket/contracts/artifacts/contracts/Factory.sol/Factory.json";
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
  private PROVIDER: JsonRpcProvider;

  constructor(
    private readonly event: EventService,
    private readonly ticket: TicketService,
    private readonly resale: ResaleService,
    private readonly config: ConfigService
  ) {
    this.PROVIDER = new JsonRpcProvider(this.config.get("JSON_RPC_URL"));
  }

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

    const existed = await this.event.findOneByTitle(title);

    if (existed) {
      throw new ConflictException("Event already exists");
    }

    const event = await this.event.create(data, user.id);

    const wallet = new Wallet(
      this.config.get("WALLET_PRIVATE_KEY") as string,
      this.PROVIDER
    );

    const contract = new Contract(
      this.config.get("CONTRACT_FACTORY_ADDRESS") as string,
      abi,
      wallet
    );

    await contract.createEvent(event.title, String(event.id));

    return event;
  }

  @Patch(":id")
  async updateEvent(
    @Param("id") id: number,
    @Body() data: UpdateEvent,
    @Session() session: Session
  ) {
    const event = await this.event.findOneById(id);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    if (event.owner_id !== session.id) {
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
