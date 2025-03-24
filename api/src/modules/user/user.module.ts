import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@/models/user.entity";
import { forwardRef, Module } from "@nestjs/common";
import { HashModule } from "@/modules/hash/hash.module";
import { UserService } from "@/modules/user/user.service";
import { EventModule } from "@/modules/event/event.module";
import { OrderModule } from "@/modules/order/order.module";
import { TokenModule } from "@/modules/token/token.module";
import { UserController } from "@/modules/user/user.controller";

@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
  imports: [
    HashModule,
    forwardRef(() => EventModule),
    forwardRef(() => TokenModule),
    forwardRef(() => OrderModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class UserModule {}
