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

  findAll() {
    return this.lessonRepo.find({ relations: ['module'] });
  }

  findOne(id: number) {
    return this.lessonRepo.findOne({ where: { id }, relations: ['module'] });
  }

  update(id: number, dto: CreateLessonDto) {
    return this.lessonRepo.update(id, dto);
  }

  remove(id: number) {
    return this.lessonRepo.delete(id);
  }
}
