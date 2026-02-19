import { Module } from '@nestjs/common';
import { UserControllers } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UserControllers],
  providers: [UsersService]
})
export class UsersModule {}