import { Controller, Body, Post, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private service : UsersService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post()
    createUser(@Body() body : CreateUserDto) {
        return this.service.create(body.email, body.password);
    }

    @Patch('/:id')
    updateUser(@Param('id') id : string, @Body() body : UpdateUserDto) {
        return this.service.updateUser(parseInt(id), body);
    }
}