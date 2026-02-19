import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserControllers {

    constructor(private service : UsersService) {}

    @Post()
    async createUser(@Body() body : CreateUserDto) {
        return await this.service.createUser({
            email: body.email, 
            password: body.password
        })
    }

    @Patch("/:id")
    async updateUser(@Param("id") id: string, @Body() body : UpdateUserDto) {
        return await this.service.updateUser(parseInt(id), body)
    }

    @Delete("/:id")
    async deleteUserById(@Param("id") id: string) {
        return await this.service.deleteUserById(parseInt(id))
    }

    @Get("/:id")
    async findUserById(@Param("id") id: string) {
        return await this.service.findUserById(parseInt(id))
    }
    
    @Get()
    async findAllUsers() {
        return await this.service.findAllUsers()
    }
    
}
