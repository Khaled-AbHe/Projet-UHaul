import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // this gets rid of what isnt in the object
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
