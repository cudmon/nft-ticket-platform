import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "@/models/user.entity";
import { CreateUser, UpdateUser } from "@/apps/user/user.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.users.find();
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return this.users.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.users.findOne({
      where: {
        email,
      },
    });
  }

  async create(user: CreateUser): Promise<UserEntity> {
    return this.users.save(this.users.create(user));
  }

  async update(id: number, user: UpdateUser): Promise<UserEntity | null> {
    await this.users.update(id, user);
    return this.findOneById(id);
  }

  async delete(id: number): Promise<boolean> {
    const found = await this.findOneById(id);

    if (!found) {
      return false;
    }

    await this.users.delete({
      id,
    });

    return true;
  }
}
