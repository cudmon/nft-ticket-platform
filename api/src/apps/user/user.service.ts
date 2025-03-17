import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "@/models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashService } from "@/mods/hash/hash.service";
import { CreateUser, UpdateUser } from "@/apps/user/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private readonly hash: HashService
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
    return this.users.save(
      this.users.create({
        ...user,
        password: await this.hash.generate(user.password),
      })
    );
  }

  async update(id: number, user: UpdateUser): Promise<UserEntity | null> {
    const found = await this.findOneById(id);

    if (!found) {
      return null;
    }

    await this.users.update({ id }, user);

    return await this.findOneById(id);
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
