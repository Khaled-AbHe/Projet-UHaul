import { Controller, Body, Post, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
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

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get('/:id')
    findUser(@Param('id') id : string) {
        console.log('handler is running')
        return this.service.findOne(parseInt(id));
    }
}