import { forwardRef, Module } from "@nestjs/common";
import { UserModule } from "@/modules/user/user.module";
import { TokenService } from "@/modules/token/token.service";

@Module({
  exports: [TokenService],
  providers: [TokenService],
  imports: [forwardRef(() => UserModule)],
})
export class TokenModule {}
