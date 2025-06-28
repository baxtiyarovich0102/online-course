import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CourseModule } from 'src/modules/entities/module.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly repo: Repository<Assignment>,
  ) {}

  async create(dto: CreateAssignmentDto, user: User, module: CourseModule) {
  if (!module) {
    throw new NotFoundException('Modul topilmadi');
  }

  const assignment = this.repo.create({
    content: dto.content,
    user,
    module,
  });

  return this.repo.save(assignment);
}


  findByUser(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['module'],
    });
  }
}
