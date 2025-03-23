import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@/models/user.entity";
import { forwardRef, Module } from "@nestjs/common";
import { HashModule } from "@/mods/hash/hash.module";
import { UserService } from "@/apps/user/user.service";
import { EventModule } from "@/apps/event/event.module";
import { OrderModule } from "@/apps/order/order.module";
import { UserController } from "@/apps/user/user.controller";

@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
  imports: [
    HashModule,
    EventModule,
    forwardRef(() => OrderModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class UserModule {}
