import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Session, UseInterceptors } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Serialize, /*SerializeInterceptor*/ } from './interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './services/auth/auth.service';

@Controller('auth')
export class UserControllers {

    constructor(
        private userService : UsersService,
        private authService : AuthService
    ) {}

    @Post('/signup')
    createUser(@Body() body : CreateUserDto) {
        return this.authService.signUp(body.email, body.password)
    }

    @Get('/signin')
    async signIn(@Body() body : CreateUserDto, @Session() session : any) {
        const user = await this.authService.signIn(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post("/signout")
    signOut(@Session() session: any) {
        session.userId = null
    }

    @Get("/whoami")
    whoAmI(@Session() session: any) {
        if (session.userId == null) throw new NotFoundException("No user is connected")
        return this.userService.findUserById(session.userId)
    }

    @Patch("/:id")
    updateUser(@Param("id") id: string, @Body() body : UpdateUserDto) {
        return this.userService.updateUser(parseInt(id), body)
    }

    @Delete("/:id")
    deleteUserById(@Param("id") id: string) {
        return this.userService.deleteUserById(parseInt(id))
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get("/:id")
    findUserById(@Param("id") id: string) {
        return this.userService.findUserById(parseInt(id))
    }
    
    @Get()
    findAllUsers() {
        return this.userService.findAllUsers()
    }
    
}
