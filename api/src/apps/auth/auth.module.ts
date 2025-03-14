import { Module } from "@nestjs/common";
import { AuthService } from "@/apps/auth/auth.service";
import { AuthController } from "@/apps/auth/auth.controller";

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
