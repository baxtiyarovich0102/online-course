import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseModule } from './entities/module.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(CourseModule)
    private moduleRepo: Repository<CourseModule>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async create(dto: CreateModuleDto) {
    const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Course not found');
    return this.moduleRepo.save({ title: dto.title, course });
  }

  async findAll() {
    return this.moduleRepo.find({ relations: ['course'] });
  }

  async findOne(id: number) {
    return this.moduleRepo.findOne({ where: { id }, relations: ['course'] });
  }

  async update(id: number, dto: CreateModuleDto) {
    return this.moduleRepo.update(id, dto);
  }

  async remove(id: number) {
    return this.moduleRepo.delete(id);
  }

  async findByCourseId(courseId: number) {
  const course = await this.courseRepo.findOne({ where: { id: courseId } });
  if (!course) {
    throw new NotFoundException('Course not found');
  }

  return this.moduleRepo.find({
    where: { course: { id: courseId } },
    relations: ['course'],
  });
}

}
