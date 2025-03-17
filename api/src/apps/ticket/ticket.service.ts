import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketEntity } from "@/models/ticket.entity";
import { CreateTicket, UpdateTicket } from "@/apps/ticket/ticket.dto";

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly tickets: Repository<TicketEntity>
  ) {}

  async findAll(): Promise<TicketEntity[]> {
    return this.tickets.find();
  }

  async findOneById(id: number): Promise<TicketEntity | null> {
    return this.tickets.findOne({
      where: {
        id,
      },
    });
  }

  async findByEventId(id: number): Promise<TicketEntity[]> {
    return this.tickets.find({
      where: {
        event: {
          id,
        },
      },
    });
  }

  async create(data: CreateTicket): Promise<TicketEntity> {
    return await this.tickets.save(this.tickets.create(data));
  }

  async createMany(data: CreateTicket[]): Promise<TicketEntity[]> {
    return await this.tickets.save(this.tickets.create(data));
  }

  async update(id: number, data: UpdateTicket): Promise<TicketEntity | null> {
    const found = await this.findOneById(id);

    if (!found) {
      return null;
    }

    await this.tickets.update({ id }, data);

    return await this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const found = await this.findOneById(id);

    if (!found) {
      return false;
    }

    await this.tickets.delete({
      id,
    });

    return true;
  }
}
