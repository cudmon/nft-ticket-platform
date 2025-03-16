import { JwtService } from "@nestjs/jwt";
import { AuthService } from "@/apps/auth/auth.service";
import { UserService } from "@/apps/user/user.service";
import { LoginDto, RegisterDto } from "@/apps/auth/auth.dto";
import { Public } from "@/common/decorators/public.decorator";
import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { Session } from "@/common/decorators/session.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly jwt: JwtService,
    private readonly auth: AuthService,
    private readonly user: UserService
  ) {}

  @Get("me")
  async me(@Session("id") id: number) {
    return await this.auth.me(id);
  }

  @Public()
  @Post("login")
  async login(@Body() data: LoginDto) {
    const user = await this.auth.login(data.email, data.password);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = this.jwt.sign({
      id: user.id,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }

  @Public()
  @Post("register")
  async register(@Body() data: RegisterDto) {
    const user = await this.user.findOneByEmail(data.email);

    if (user) {
      throw new ConflictException("User already exists");
    }

    return await this.auth.register(data.email, data.password, data.name);
  }
}
