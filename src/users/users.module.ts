import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users/users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
