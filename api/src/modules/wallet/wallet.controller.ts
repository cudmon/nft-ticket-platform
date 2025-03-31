import { OrderService } from "@/modules/order/order.service";
import { TokenService } from "@/modules/token/token.service";
import { Controller, forwardRef, Get, Inject, Param } from "@nestjs/common";

@Controller("wallets")
export class WalletController {
  constructor(
    @Inject(forwardRef(() => OrderService))
    private readonly order: OrderService,
    private readonly token: TokenService
  ) {}

  @Get(":address/orders")
  async findOrders(@Param("address") address: string) {
    return this.order.findByWallet(address);
  }

  @Get(":address/tokens")
  async findTokens(@Param("address") address: string) {
    const tokens = await this.token.findByWallet(address);

    const result = Promise.all(
      tokens.map(async (token) => ({
        id: token.id,
        address: token.address,
        nft_id: token.nft_id,
        resale: await this.token.isTokenResale(token.id),
        ticket: {
          id: token.ticket.id,
          name: token.ticket.name,
          price: token.ticket.price,
        },
        event: {
          id: token.ticket.event.id,
          title: token.ticket.event.title,
        },
      }))
    );

    return result;
  }
}
