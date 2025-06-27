import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly repo: Repository<Course>,
  ) {}

  create(dto: CreateCourseDto) {
    const course = this.repo.create(dto);
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
