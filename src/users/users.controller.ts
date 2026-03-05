import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
// import { UseInterceptors,ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin-guard';


@Controller('auth')
export class UserControllers {

    constructor(private service : UsersService, private authService : AuthService) {}

    @Post('/signup')
    async createUser(@Body() body : CreateUserDto, @Session() session : any) {
        return await this.authService.signUp(body.email,body.password)
    }

    @Post('/signin')
        async signIn(@Body() body : CreateUserDto, @Session() session : any){
            const user = await this.authService.signIn(body.email,body.password)
            session.userId = user.id;
            return user;
        }
    
        
    // @UseInterceptors(CurrentUserInterceptor)
    @Get('/whoami')
        whoAmI(@CurrentUser() user: User){
            return user;   
        }   

    @Post('/signout')
        signOut(@Session() session: any){
            session.userId = null;
        }    

    @UseGuards(AuthGuard)  
    @Patch("/:id")
    async updateUser(@Param("id") id: string, @Body() body : UpdateUserDto) {
        return await this.service.updateUser(parseInt(id), body)
    }

    @UseGuards(AdminGuard)
    @Delete("/:id")
    async deleteUserById(@Param("id") id: string) {
        return await this.service.deleteUserById(parseInt(id))
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get("/:id")
    async findUserById(@Param("id") id: string) {
        return await this.service.findUserById(parseInt(id))
    }
    
    @Get()
    async findAllUsers() {
        return await this.service.findAllUsers()
    }
}
