import { AppModule } from "@/app.module";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.enableCors();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors();

  const docs = new DocumentBuilder()
    .setTitle("NFT Ticket Platform")
    .setVersion("0.0.1")
    .build();

  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, docs));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
