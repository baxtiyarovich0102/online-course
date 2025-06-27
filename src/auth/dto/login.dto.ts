import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'men@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;
}
