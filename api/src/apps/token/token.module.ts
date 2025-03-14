import { Module } from "@nestjs/common";
import { TokenService } from "@/apps/token/token.service";
import { TokenController } from "@/apps/token/token.controller";

@Module({
  imports: [],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [],
})
export class TokenModule {}
