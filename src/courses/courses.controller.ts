import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsersService } from 'src/users/users.service';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService, private readonly usersService: UsersService,) {}

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

  @UseGuards(JwtAuthGuard)
  @Post(':id/enroll')
  async enroll(@Param('id') courseId: number, @Req() req) {
    const user = await this.usersService.findOneWithEnrolledCourses(req.user.id);
    const course = await this.coursesService.findOne(courseId);

    if (!user || !course) {
      throw new NotFoundException('User or course not found');
    }

    // Agar allaqachon yozilgan bo‘lsa qaytib yozmaslik
    const alreadyEnrolled = user.enrolledCourses.some(c => c.id === course.id);
    if (alreadyEnrolled) {
      return { message: 'You are already enrolled in this course' };
    }

    user.enrolledCourses.push(course);
    await this.usersService.save(user);

    return { message: 'Successfully enrolled' };
  }

}
