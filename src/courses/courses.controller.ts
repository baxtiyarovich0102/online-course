import {
  Controller, Get, Post, Body, Param, Delete, Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Post()
  @Roles('admin', 'teacher')
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin', 'teacher')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin', 'teacher')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
