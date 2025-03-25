import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "@/models/order.entity";
import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "@/modules/user/user.module";
import { EventModule } from "@/modules/event/event.module";
import { OrderService } from "@/modules/order/order.service";
import { TicketModule } from "@/modules/ticket/ticket.module";

@Module({
  exports: [OrderService],
  providers: [OrderService],
  imports: [
    EventModule,
    TicketModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([OrderEntity]),
  ],
})
export class OrderModule {}
