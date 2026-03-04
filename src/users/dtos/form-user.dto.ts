import { IsEmail, IsString, IsNotEmpty, IsNumber } from "class-validator";

export class FormulaireUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    phoneNumber: number

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    companyName: string

    @IsString()
    @IsNotEmpty()
    companyAddress: string

    @IsString()
    @IsNotEmpty()
    postalCode: string

}