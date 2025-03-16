import { CreateUser } from "@/apps/user/user.dto";
import { UserService } from "@/apps/user/user.service";
import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
} from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get()
  async findAll() {
    return await this.user.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.user.findOneById(id);
  }

  @Post()
  async create(
    @Body()
    user: CreateUser
  ) {
    const found = await this.user.findOneByEmail(user.email);

    if (found) {
      throw new ConflictException("User already exists");
    }

    return this.user.create({
      ...user,
    });
  }
}
