import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CoursesService } from "src/courses/courses.service";
import { UsersService } from "src/users/users.service";


@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(private usersService: UsersService, private coursesService: CoursesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const courseId = +request.params.courseId;

    const user = await this.usersService.findOneWithEnrolledCourses(userId);
    if (!user || !user.enrolledCourses) return false;
    return user.enrolledCourses.some(course => course.id === courseId);

  }
}
