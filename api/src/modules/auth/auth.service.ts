import { Wallet } from "ethers";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@/modules/user/user.service";
import { HashService } from "@/modules/hash/hash.service";
import { LoginDto, RegisterDto } from "@/modules/auth/auth.dto";
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly user: UserService,
    private readonly hash: HashService
  ) {}

  async me(id: number) {
    return await this.user.findOneById(id);
  }

  async login(data: LoginDto) {
    const user = await this.user.findOneByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await this.hash.compare(data.password, user.password);

    if (!valid) {
      return new UnauthorizedException("Invalid credentials");
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

  async register(data: RegisterDto) {
    const user = await this.user.findOneByEmail(data.email);

    if (user) {
      throw new ConflictException("User already exists");
    }

    return await this.user.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }
}
