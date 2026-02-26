import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
//import {CookieSession} from 'cookie-session';

const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys : ['mysecretkey']
  }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // this gets rid of what isnt in the object
    forbidNonWhitelisted: true,
    transform: true,
  }))
  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.get(Reflector))
  // )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
