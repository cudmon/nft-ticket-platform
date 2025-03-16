import { Injectable } from "@nestjs/common";
import { UserService } from "@/apps/user/user.service";

@Injectable()
export class AuthService {
  constructor(private readonly user: UserService) {}

  async login(email: string, password: string) {
    const user = await this.user.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const valid = user.password === password;

    if (!valid) {
      return null;
    }

    return user;
  }

  async register(email: string, password: string, name: string) {
    return await this.user.create({
      email,
      password,
      name,
    });
  }
}
