import { AuthService } from "@/modules/auth/auth.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { Public } from "@/common/decorators/public.decorator";
import { LoginDto, RegisterDto } from "@/modules/auth/auth.dto";
import { Session } from "@/common/decorators/session.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get("me")
  async me(@Session("id") id: number) {
    return await this.auth.me(id);
  }

  @Public()
  @Post("login")
  async login(@Body() data: LoginDto) {
    return await this.auth.login(data);
  }

  @Public()
  @Post("register")
  async register(@Body() data: RegisterDto) {
    return await this.auth.register(data);
  }
}
