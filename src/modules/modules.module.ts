import { forwardRef, Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { CourseModule } from './entities/module.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/courses/courses.module';
import { EnrollmentGuard } from 'src/auth/guards/enrollment.guard';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseModule, User]), UsersModule, forwardRef(() => CoursesModule), LessonsModule],
  controllers: [ModulesController],
  providers: [ModulesService, EnrollmentGuard],
  exports: [ModulesService],
})
export class ModulesModule {}
