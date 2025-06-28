import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly repo: Repository<Course>,
    private readonly usersService: UsersService,
  ) {}

 async create(dto: CreateCourseDto) {
  const teacher = await this.usersService.findOne(dto.teacherId); 

  const course = this.repo.create({
    ...dto,
    teacher, 
  });

  return this.repo.save(course);
}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const course = await this.repo.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Kurs topilmadi');
    return course;
  }

  async update(id: number, dto: UpdateCourseDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const course = await this.findOne(id);
    return this.repo.remove(course);
  }
}
