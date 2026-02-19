import { Module } from '@nestjs/common';
import { UserControllers } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UserControllers],
  providers: [UsersService]
})
export class UsersModule {}
