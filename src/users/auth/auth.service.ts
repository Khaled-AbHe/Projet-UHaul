import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt} from 'crypto'; //pour généré notre salt
import { promisify } from 'util'; //pour transfromer scrypt en fonction qui retourne promesse

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private usersService : UsersService) {}

    async signup(email : string, password : string) {

        // 1. check if email is in the database
        const users = await this.usersService.findAllUserByEmail(email);
        if(users.length) {
            throw new BadRequestException('email in use');
        }

        // 2. hash the password
        // 2.1 generate salt

        const salt = randomBytes(8).toString('hex');
        // 2.2 hash the salt and password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        // 2.3 join the hashed result and salt together in bd
        const result = salt + '.' + hash.toString('hex');
        // 3. create new user
        const user = await this.usersService.create(email, result);
        // 4. return user
        return user;
    }

    async signin(email : string, password : string) {
        // 1. find user by email
        const [user] = await this.usersService.findAllUserByEmail(email);

        // 1.2. if user not found, throw error

        if(!user) {
            throw new NotFoundException('user not found');
        }

        // 2. retrieve the salt and hash from stored password

        const [salt, storedHash] = user.password.split('.');

        // 3. hash the supplied password with the salt

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // 4. compare the hashed result with the stored hash, if they match, return user

        if(hash.toString('hex') !== storedHash) {
            throw new BadRequestException('bad password');
        }
        return user;
    }
}