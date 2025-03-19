import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "@/models/event.entity";
import { EventService } from "@/apps/event/event.service";
import { TicketModule } from "@/apps/ticket/ticket.module";
import { EventController } from "@/apps/event/event.controller";
import { ContractModule } from "@/mods/contract/contract.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    TicketModule,
    ContractModule,
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
