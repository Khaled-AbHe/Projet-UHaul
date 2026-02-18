import { Module } from '@nestjs/common';
import { UserControllers } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UserControllers],
  providers: [UsersService]
})
export class UsersModule {}
