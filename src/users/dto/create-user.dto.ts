import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Men' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'men@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @MinLength(6)
  password: string;
}
