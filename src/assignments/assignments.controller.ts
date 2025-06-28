import { Controller, Post, Param, Body, UseGuards, Req, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { ModulesService } from 'src/modules/modules.service';
import { EnrollmentGuard } from 'src/auth/guards/enrollment.guard';

@Controller('modules/:moduleId/assignment')
@UseGuards(JwtAuthGuard, EnrollmentGuard)
export class AssignmentsController {
  constructor(
    private readonly assignmentsService: AssignmentsService,
    private readonly modulesService: ModulesService,
  ) {}

  @Post()
  async submit(
    @Param('moduleId', ParseIntPipe) moduleId: number,
    @Body() dto: CreateAssignmentDto,
    @Req() req,
  ) {
    const user = req.user;
    const module = await this.modulesService.findOne(moduleId);

    if (!module) {
    throw new NotFoundException('Modul topilmadi');
  }
    return this.assignmentsService.create(dto, user, module);
  }
}
