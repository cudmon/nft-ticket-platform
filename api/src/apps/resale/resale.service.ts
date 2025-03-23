import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResaleEntity } from "@/models/resale.entity";

@Injectable()
export class ResaleService {
  constructor(
    @InjectRepository(ResaleEntity)
    private readonly resales: Repository<ResaleEntity>
  ) {}
}
