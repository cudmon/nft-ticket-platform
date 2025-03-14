import { UserService } from "@/apps/user/user.service";
import { Controller, Get, Param } from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get()
  findAll() {
    return this.user.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.user.findOneById(id);
  }
}
