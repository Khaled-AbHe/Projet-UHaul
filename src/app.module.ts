import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './users/services/auth.service';
import { CurrentUserMiddleware } from './users/middlewares/current-user.middleware';
import { UserControllers } from './users/users.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "sqlite",
        database : "db.sqlite",
        autoLoadEntities: true,
        synchronize: true // Usually, you keep this at False so you dont mess with an established database
      }
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
//
 export class AppModule{}
// export class AppModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(CurrentUserMiddleware)
//       .forRoutes('/whoami');
// }
//}

