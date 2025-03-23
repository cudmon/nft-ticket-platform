import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "@/models/order.entity";
import { UserModule } from "@/apps/user/user.module";
import { OrderService } from "@/apps/order/order.service";
import { TicketModule } from "@/apps/ticket/ticket.module";
import { OrderController } from "@/apps/order/order.controller";
import { ContractModule } from "@/mods/contract/contract.module";

@Module({
  imports: [
    ContractModule,
    TypeOrmModule.forFeature([OrderEntity]),
    forwardRef(() => UserModule),
    TicketModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
