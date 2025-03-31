import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { TokenEntity } from "@/models/token.entity";
import { UserModule } from "@/modules/user/user.module";
import { TokenService } from "@/modules/token/token.service";
import { ResaleEntity } from "@/models/resale.entity";

@Module({
  exports: [TokenService],
  providers: [TokenService],
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([TokenEntity, ResaleEntity]),
  ],
})
export class TokenModule {}
