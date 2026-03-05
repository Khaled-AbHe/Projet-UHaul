import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt} from 'crypto'; // pour generer notre salt
import { promisify } from 'util'; // pour transformer scrypt en une fonction qui retourne une promesse

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private usersService : UsersService) {}

    async signUp(email: string, password: string, admin: boolean) {
        // 1. check if email is in the db
        const user = await this.usersService.findUserByEmail(email)
        if (!!user) {
            throw new BadRequestException("Email already taken")
        }
        // 2. create and hash the password
        const salt = randomBytes(8).toString("hex")
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + "." + hash.toString("hex")

        // 3. creates and returns the new user
        return await this.usersService.createUser(email, result, admin)
    }

    async signIn(email:string, password:string) {
        // verifies user with specified email exist
        const user = await this.usersService.findUserByEmail(email)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        // Acquires hashed password data
        const [salt, storedHash] = user.password.split(".")

        // Hashes the specified password
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Verifies that the passwords match
        if (hash.toString("hex") !== storedHash) {
            throw new BadRequestException("Incorrect Password")
        }

        // returns the user if all is checks out
        return user
    }

    // async whoAmI(userId: number) {
    //     if (userId == null) throw new NotFoundException("No user is connected")
    //     return await this.usersService.findUserById(userId)
    // }
}
