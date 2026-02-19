import { Controller,Body,Post,Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserControllers {

    constructor(private service : UsersService){}

    
    @Get()
    findAll(){
        return this.service.findAll();
    }

    @Post()
    createUser(@Body() body : CreateUserDto){
        return this.service.create(body.email,body.password);
    }

    



}