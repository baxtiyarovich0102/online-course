import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { CoursesService } from "src/courses/courses.service";
import { UsersService } from "src/users/users.service";
import { ModulesService } from "src/modules/modules.service";

@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private coursesService: CoursesService,
    private modulesService: ModulesService 
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    const moduleId = +request.params.moduleId;
    const module = await this.modulesService.findOne(moduleId);
    const courseId = module?.course?.id;
    if (!courseId) throw new ForbiddenException('Modul tegishli kurs topilmadi');

    const user = await this.usersService.findOneWithEnrolledCourses(userId);
    if (!user || !user.enrolledCourses) return false;

    const isEnrolled = user.enrolledCourses.some(course => course.id === courseId);
    if (!isEnrolled) throw new ForbiddenException('Siz bu kursga yozilmagansiz');
    
    return true;
  }
}
