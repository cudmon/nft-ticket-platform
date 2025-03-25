import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenEntity } from "@/models/token.entity";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokens: Repository<TokenEntity>
  ) {}

  async findByWallet(address: string) {
    return this.tokens.find({
      where: {
        address,
      },
    });
  }
}
