import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "@/models/event.entity";
import { EventService } from "@/apps/event/event.service";
import { TicketModule } from "@/apps/ticket/ticket.module";
import { ResaleModule } from "@/apps/resale/resale.module";
import { EventController } from "@/apps/event/event.controller";
import { ContractModule } from "@/mods/contract/contract.module";

@Module({
  exports: [EventService],
  providers: [EventService],
  controllers: [EventController],
  imports: [
    TicketModule,
    ResaleModule,
    ContractModule,
    TypeOrmModule.forFeature([EventEntity]),
  ],
})
export class EventModule {}
