import { UserService } from "@/modules/user/user.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class TokenService {
  constructor(private readonly user: UserService) {}

  async findByUserId(userId: number) {
    const user = await this.user.findOneById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return [];
  }
}
