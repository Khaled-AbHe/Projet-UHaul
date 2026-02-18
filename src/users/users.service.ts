import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    //constructor( private repo : Repository ) {} // If you just leave it as Repository, it wont know we want a User Repo
    constructor( @InjectRepository(User) private repo : Repository<User> ) {} // By doing this way, you will have a User Repo

    async createUser(user: User) {
        await this.repo.create(user)
        return `Id: ${user.id}\nEmail: ${user.email}\nPassword: ${user.password}`
    }

}
