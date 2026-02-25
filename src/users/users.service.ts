import { Body, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    [x: string]: any;
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(email: string, password: string) {
        await this.repo.create({email, password})
        return this.repo.save({email, password});
    }

    //a faire
    async findOne(id : number) {
      const user = await this.repo.findOneBy({id});

      if(!user) {
        return null
      }
      return user;
    }

    async remove(id: number) {
      await this.repo.delete(id);
    }

    //a faire
    async findAll() {
      const users = await this.repo.find();
      return users;
    }

    // a faire
    async updateUser(id : number, attrs: Partial<User>) {
      const user = await this.repo.findOneBy({id: 1});

      if(!user) {
        //lancer erreur not found
        return null;
      }

      Object.assign(user, attrs);
      return this.repo.save(user);
    }
}