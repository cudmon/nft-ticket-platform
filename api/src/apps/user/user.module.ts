import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@/models/user.entity";
import { HashModule } from "@/mods/hash/hash.module";
import { UserService } from "@/apps/user/user.service";
import { EventModule } from "@/apps/event/event.module";
import { UserController } from "@/apps/user/user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), EventModule, HashModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
