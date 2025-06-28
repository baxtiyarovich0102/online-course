import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ModulesService } from 'src/modules/modules.service';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private modulesService: ModulesService,
    private coursesService: CoursesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const params = request.params;

    let courseId: number | null = null;

    if (params.moduleId) {
      const moduleId = Number(params.moduleId);
      if (isNaN(moduleId)) throw new ForbiddenException('Noto‘g‘ri modul ID');
      const module = await this.modulesService.findOne(moduleId);
      courseId = module?.course?.id ?? null;
      if (!courseId) throw new ForbiddenException('Modul tegishli kurs topilmadi');
    } else if (params.courseId) {
      courseId = Number(params.courseId);
      if (isNaN(courseId)) throw new ForbiddenException('Noto‘g‘ri kurs ID');
    } else {
      throw new ForbiddenException('courseId yoki moduleId kerak');
    }

    const user = await this.usersService.findOneWithEnrolledCourses(userId);
    if (!user || !user.enrolledCourses) return false;

    const isEnrolled = user.enrolledCourses.some(course => course.id === courseId);
    if (!isEnrolled) throw new ForbiddenException('Siz bu kursga yozilmagansiz');

    return true;
  }
}
