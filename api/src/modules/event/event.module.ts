import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "@/models/event.entity";
import { forwardRef, Module } from "@nestjs/common";
import { OrderEntity } from "@/models/order.entity";
import { TokenEntity } from "@/models/token.entity";
import { ResaleEntity } from "@/models/resale.entity";
import { UserModule } from "@/modules/user/user.module";
import { TokenModule } from "@/modules/token/token.module";
import { EventService } from "@/modules/event/event.service";
import { TicketModule } from "@/modules/ticket/ticket.module";
import { ResaleModule } from "@/modules/resale/resale.module";
import { EventController } from "@/modules/event/event.controller";

@Module({
  exports: [EventService],
  providers: [EventService],
  controllers: [EventController],
  imports: [
    TokenModule,
    TicketModule,
    ResaleModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([
      EventEntity,
      OrderEntity,
      TokenEntity,
      ResaleEntity,
    ]),
  ],
})
export class EventModule {}
