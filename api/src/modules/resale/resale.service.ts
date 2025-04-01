import { IsNull, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResaleEntity } from "@/models/resale.entity";

@Injectable()
export class ResaleService {
  constructor(
    @InjectRepository(ResaleEntity)
    private readonly resales: Repository<ResaleEntity>
  ) {}

  async findByEventId(id: number): Promise<ResaleEntity[]> {
    return this.resales.find({
      relations: {
        ticket: {
          event: true,
        },
      },
      where: {
        order: IsNull(),
        ticket: {
          event: { id },
        },
      },
    });
  }
}
