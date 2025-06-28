import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { UsersModule } from 'src/users/users.module';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UsersModule, forwardRef(() => ModulesModule)],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}
