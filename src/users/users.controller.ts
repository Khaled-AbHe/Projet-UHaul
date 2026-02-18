import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserControllers {

    constructor(private service : UsersService) {}

    @Post()
    createUser(@Body() body : CreateUserDto) {
        return this.service.createUser({
            id: 1,
            email: body.email, 
            password: body.password
        })
    }
}
