import { CreateEvent } from "@/apps/event/event.dto";
import { UserService } from "@/apps/user/user.service";
import { EventService } from "@/apps/event/event.service";
import { CreateUser, UpdateUser } from "@/apps/user/user.dto";
import { Role, Roles } from "@/common/decorators/roles.decorator";
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly event: EventService
  ) {}

  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.user.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.user.findOneById(id);
  }

  @Get(":id/events")
  async findEvents(@Param("id") id: number) {
    return await this.event.findByUserId(id);
  }

  @Roles(Role.Admin)
  @Post()
  async create(
    @Body()
    user: CreateUser
  ) {
    const found = await this.user.findOneByEmail(user.email);

    if (found) {
      throw new ConflictException("User already exists");
    }

    return this.user.create(user);
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body()
    data: UpdateUser
  ) {
    const user = await this.user.update(id, data);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  @Roles(Role.Admin)
  @Delete(":id")
  async delete(@Param("id") id: number) {
    const removed = await this.user.delete(id);

    if (!removed) {
      throw new NotFoundException("User not found");
    }

    return removed;
  }
}
