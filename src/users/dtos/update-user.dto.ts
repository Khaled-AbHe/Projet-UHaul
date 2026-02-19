import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string

}