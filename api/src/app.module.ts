import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@/apps/auth/auth.module";
import { UserModule } from "@/apps/user/user.module";
import { TokenModule } from "@/apps/token/token.module";
import { EventModule } from "@/apps/event/event.module";
import { OrderModule } from "@/apps/order/order.module";
import { TicketModule } from "@/apps/ticket/ticket.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get("DB_HOST"),
        port: config.get("DB_PORT"),
        username: config.get("DB_USER"),
        password: config.get("DB_PASS"),
        database: config.get("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: config.get("NODE_ENV") === "development",
      }),
    }),
    AuthModule,
    EventModule,
    TicketModule,
    TokenModule,
    UserModule,
    OrderModule,
  ],
})
export class AppModule {}
