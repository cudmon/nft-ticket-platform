import { Controller, Get } from "@nestjs/common";
import { AuthService } from "@/apps/auth/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get()
  hello(): string {
    return this.auth.hello();
  }
}
