import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class RegisterDto {
    @ApiProperty({ example: 'Men' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'men@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '1234' })
    @MinLength(4)
    password: string
}