import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './users/services/auth.service';


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
export class AppModule {}
