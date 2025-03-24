import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@/modules/auth/auth.module";
import { UserModule } from "@/modules/user/user.module";
import { TokenModule } from "@/modules/token/token.module";
import { EventModule } from "@/modules/event/event.module";
import { OrderModule } from "@/modules/order/order.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TicketModule } from "@/modules/ticket/ticket.module";
import { ResaleModule } from "@/modules/resale/resale.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    UserModule,
    EventModule,
    OrderModule,
    TokenModule,
    ResaleModule,
    TicketModule,
  ],
})
export class AppModule {}
