import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResaleEntity } from "@/models/resale.entity";
import { ResaleService } from "@/apps/resale/resale.service";
import { ResaleController } from "@/apps/resale/resale.controller";

@Module({
  exports: [ResaleService],
  providers: [ResaleService],
  controllers: [ResaleController],
  imports: [TypeOrmModule.forFeature([ResaleEntity])],
})
export class ResaleModule {}
