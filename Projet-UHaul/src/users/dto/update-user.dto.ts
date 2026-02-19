import {IsEmail, IsNotEmpty,IsString} from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }