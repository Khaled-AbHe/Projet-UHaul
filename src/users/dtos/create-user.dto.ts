import { IsEmail, IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string

    @IsBoolean()
    admin: boolean
}