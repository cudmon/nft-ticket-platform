import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateEvent } from "@/apps/event/event.dto";
import { EventEntity } from "@/models/event.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly events: Repository<EventEntity>
  ) {}

  async findAll(): Promise<EventEntity[]> {
    return await this.events.find();
  }

  async findOneById(id: number): Promise<EventEntity | null> {
    return await this.events.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByTitle(title: string): Promise<EventEntity | null> {
    return await this.events.findOne({
      where: {
        title,
      },
    });
  }

  async create(event: CreateEvent): Promise<EventEntity> {
    return await this.events.save(event);
  }
}
