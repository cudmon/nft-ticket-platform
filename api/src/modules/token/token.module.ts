import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { TokenEntity } from "@/models/token.entity";
import { UserModule } from "@/modules/user/user.module";
import { TokenService } from "@/modules/token/token.service";

@Module({
  exports: [TokenService],
  providers: [TokenService],
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([TokenEntity]),
  ],
})
export class TokenModule {}
