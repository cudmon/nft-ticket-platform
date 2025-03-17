import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateEvent, UpdateEvent } from "@/apps/event/event.dto";
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

  async findByUserId(id: number): Promise<EventEntity[]> {
    return await this.events.find({
      where: {
        owner_id: id,
      },
    });
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

  async create(event: CreateEvent, userId: number): Promise<EventEntity> {
    return await this.events.save(
      this.events.create({
        ...event,
        owner_id: userId,
      })
    );
  }

  async update(id: number, event: UpdateEvent): Promise<EventEntity | null> {
    const found = await this.findOneById(id);

    if (!found) {
      return null;
    }

    await this.events.update({ id }, event);

    return await this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const found = await this.findOneById(id);

    if (!found) {
      return false;
    }

    await this.events.delete({
      id,
    });

    return true;
  }
}
