import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResaleEntity } from "@/models/resale.entity";
import { ResaleService } from "@/modules/resale/resale.service";

@Module({
  exports: [ResaleService],
  providers: [ResaleService],
  imports: [TypeOrmModule.forFeature([ResaleEntity])],
})
export class ResaleModule {}
