import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher')
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles('admin', 'teacher')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin', 'teacher')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
