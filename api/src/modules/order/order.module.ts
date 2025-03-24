import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "@/models/order.entity";
import { UserModule } from "@/modules/user/user.module";
import { OrderService } from "@/modules/order/order.service";
import { TicketModule } from "@/modules/ticket/ticket.module";
import { OrderController } from "@/modules/order/order.controller";
import { EventModule } from "@/modules/event/event.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    forwardRef(() => UserModule),
    TicketModule,
    EventModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
