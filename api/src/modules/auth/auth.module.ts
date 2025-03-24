import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { AuthGuard } from "@/common/guards/auth.guard";
import { UserModule } from "@/modules/user/user.module";
import { HashModule } from "@/modules/hash/hash.module";
import { AuthService } from "@/modules/auth/auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "@/modules/auth/auth.controller";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    HashModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get("JWT_SECRET"),
        signOptions: {
          expiresIn: config.get("JWT_EXPIRES_IN"),
        },
      }),
    }),
  ],
})
export class AuthModule {}
