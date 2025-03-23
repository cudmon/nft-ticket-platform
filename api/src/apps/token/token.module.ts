import { Module } from "@nestjs/common";
import { TokenService } from "@/apps/token/token.service";

@Module({
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
