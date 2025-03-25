import { forwardRef, Module } from "@nestjs/common";
import { OrderModule } from "@/modules/order/order.module";
import { TokenModule } from "@/modules/token/token.module";
import { WalletController } from "@/modules/wallet/wallet.controller";

@Module({
  controllers: [WalletController],
  imports: [forwardRef(() => TokenModule), forwardRef(() => OrderModule)],
})
export class WalletModule {}
