import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CourseModule } from 'src/modules/entities/module.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,
    @InjectRepository(CourseModule)
    private moduleRepo: Repository<CourseModule>,
  ) {}

  async create(dto: CreateLessonDto) {
    const module = await this.moduleRepo.findOne({ where: { id: dto.moduleId } });
    if (!module) throw new NotFoundException('Module not found');
    return this.lessonRepo.save({ title: dto.title, content: dto.content, module });
  }

  async findAll() {
    return this.lessonRepo.find({ relations: ['module'] });
  }

  async findOne(id: number) {
    return this.lessonRepo.findOne({ where: { id }, relations: ['module'] });
  }

  async update(id: number, dto: CreateLessonDto) {
    return this.lessonRepo.update(id, dto);
  }

  async remove(id: number) {
    return this.lessonRepo.delete(id);
  }

  async findByModuleId(moduleId: number) {
  return this.lessonRepo.find({
    where: { module: { id: moduleId } },
    relations: ['module'],
  });
}

}
