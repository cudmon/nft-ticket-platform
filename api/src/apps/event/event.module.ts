import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "@/models/event.entity";
import { EventService } from "@/apps/event/event.service";
import { TicketModule } from "@/apps/ticket/ticket.module";
import { EventController } from "@/apps/event/event.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), TicketModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [],
})
export class EventModule {}
