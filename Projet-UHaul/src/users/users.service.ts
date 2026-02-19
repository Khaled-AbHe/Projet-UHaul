import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'

@Injectable()
export class UsersService {
    

    constructor(@InjectRepository(User) private repo : Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({email,password});
        return this.repo.save(user);

        // return this.repo.save({email,password});
    }

    async findAll(){
        const users = await this.repo.find();
        return users;
        
    }

    async findOne(id : number){
        const user = await this.repo.findOneBy({id});
        return user
    }

    async remove(id : number){
        await this.repo.delete(id)
    }

    async updateUser(id:number, attrs: Partial<User>){
        const user = await this.repo.findOneBy({id : 1});

        if(!user){
            //lancer erreur not found
            return null;
        }
        Object.assign(user,attrs);
        return this.repo.save(user);
    }
}

