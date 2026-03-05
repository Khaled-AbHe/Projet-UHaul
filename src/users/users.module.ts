import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserControllers } from './users.controller';
import { UsersService } from './services/users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR, MiddlewareBuilder } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UserControllers],
  // providers: [UsersService,AuthService,CurrentUserInterceptor]
  providers: [
    UsersService,
    AuthService,
    CurrentUserInterceptor,
    CurrentUserMiddleware
],
  exports : [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes('*');
}
}