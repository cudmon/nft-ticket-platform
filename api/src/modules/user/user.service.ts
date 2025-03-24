import { Wallet } from "ethers";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "@/models/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashService } from "@/modules/hash/hash.service";

@Injectable()
export class UserService {
  constructor(
    private readonly hash: HashService,
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>
  ) {}

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

  async create(user: {
    name?: string;
    email: string;
    password: string;
  }): Promise<UserEntity> {
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
}
