import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "@/models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashService } from "@/mods/hash/hash.service";
import { Wallet } from "ethers";

@Injectable()
export class UserService {
  constructor(
    private readonly hash: HashService,
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

  async create(
    user: Pick<UserEntity, "email" | "password" | "name">
  ): Promise<UserEntity> {
    const wallet = Wallet.createRandom();

    return this.users.save(
      this.users.create({
        ...user,
        key: wallet.privateKey,
        address: wallet.address,
        password: await this.hash.generate(user.password),
      })
    );
  }

  async update(
    id: number,
    user: Partial<Pick<UserEntity, "email" | "password" | "name">>
  ): Promise<UserEntity | null> {
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
