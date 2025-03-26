import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { TicketEntity } from "@/models/ticket.entity";
import { EventModule } from "@/modules/event/event.module";
import { TicketService } from "@/modules/ticket/ticket.service";
import { TicketController } from "@/modules/ticket/ticket.controller";

@Module({
  exports: [TicketService],
  providers: [TicketService],
  controllers: [TicketController],
  imports: [
    TypeOrmModule.forFeature([TicketEntity]),
    forwardRef(() => EventModule),
  ],
})
export class TicketModule {}
