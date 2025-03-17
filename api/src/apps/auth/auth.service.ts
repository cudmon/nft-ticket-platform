import { Injectable } from "@nestjs/common";
import { UserService } from "@/apps/user/user.service";
import { HashService } from "@/mods/hash/hash.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
    private readonly hash: HashService
  ) {}

  async me(id: number) {
    return await this.user.findOneById(id);
  }

  async login(email: string, password: string) {
    const user = await this.user.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const valid = await this.hash.compare(password, user.password);

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
