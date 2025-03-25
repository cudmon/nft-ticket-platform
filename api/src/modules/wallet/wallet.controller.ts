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
    return this.token.findByWallet(address);
  }
}
