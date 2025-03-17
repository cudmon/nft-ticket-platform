import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "@/apps/user/user.module";
import { AuthGuard } from "@/common/guards/auth.guard";
import { AuthService } from "@/apps/auth/auth.service";
import { RolesGuard } from "@/common/guards/roles.guard";
import { AuthController } from "@/apps/auth/auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HashModule } from "@/mods/hash/hash.module";

@Module({
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
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [],
})
export class AuthModule {}
