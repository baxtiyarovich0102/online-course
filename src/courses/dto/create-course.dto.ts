import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'NestJS course' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'about NestJS' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Men' })
  @IsString()
  teacher: string;

  @ApiProperty({ example: 'Backend' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'Beginner' })
  @IsString()
  level: string;
}
