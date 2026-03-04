import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseInterceptors } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Serialize, /*SerializeInterceptor*/ } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './services/auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/currentUser.interceptor';

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {

    constructor(
        private usersService : UsersService,
        private authService : AuthService
    ) {}

    @Post('/signup')
    signUp(@Body() body : CreateUserDto) {
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
    whoAmI(@CurrentUser() user: User) {
        return user
        // return this.authService.whoAmI(user.id)
    }

    @Patch("/:id")
    updateUser(@Param("id") id: string, @Body() body : UpdateUserDto) {
        return this.usersService.updateUser(parseInt(id), body)
    }

    @Delete("/:id")
    deleteUserById(@Param("id") id: string) {
        return this.usersService.deleteUserById(parseInt(id))
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get("/:id")
    findUserById(@Param("id") id: string) {
        return this.usersService.findUserById(parseInt(id))
    }
    
    @Get()
    findAllUsers() {
        return this.usersService.findAllUsers()
    }
    
}
