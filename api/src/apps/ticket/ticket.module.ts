import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketEntity } from "@/models/ticket.entity";
import { TicketService } from "@/apps/ticket/ticket.service";
import { TicketController } from "@/apps/ticket/ticket.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
