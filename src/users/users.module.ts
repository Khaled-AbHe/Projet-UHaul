import { Module } from '@nestjs/common';
import { UserControllers } from './users.controller';
import { UsersService } from './services/users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UserControllers],
  providers: [UsersService,AuthService]
})
export class UsersModule {}
