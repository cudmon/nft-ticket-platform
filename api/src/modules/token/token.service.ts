import { IsNull, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenEntity } from "@/models/token.entity";
import { ResaleEntity } from "@/models/resale.entity";

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokens: Repository<TokenEntity>,
    @InjectRepository(ResaleEntity)
    private readonly resales: Repository<ResaleEntity>
  ) {}

  async findByWallet(address: string) {
    return this.tokens.find({
      where: {
        address,
      },
      relations: {
        ticket: {
          event: true,
        },
      },
    });
  }

  async countByTicketId(ticketId: number) {
    return this.tokens.count({
      where: {
        ticket: {
          id: ticketId,
        },
      },
    });
  }

  async isTokenResale(tokenId: number) {
    const resale = await this.resales.findOne({
      where: {
        order: IsNull(),
        token: {
          id: tokenId,
        },
      },
    });

    return resale !== null;
  }
}
