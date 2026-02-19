import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async createUser(user: User) {
        await this.repo.create(user)
        return `Id: ${user.id}\nEmail: ${user.email}\nPassword: ${user.password}`
    }
}