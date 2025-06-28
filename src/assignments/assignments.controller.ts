import { Controller, Post, Param, Body, UseGuards, Req, ParseIntPipe, NotFoundException, Get } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { ModulesService } from 'src/modules/modules.service';
import { EnrollmentGuard } from 'src/auth/guards/enrollment.guard';

@Controller('assignments')
@UseGuards(JwtAuthGuard)
export class AssignmentsController {
  constructor(
    private readonly assignmentsService: AssignmentsService,
    private readonly modulesService: ModulesService,
  ) {}

  @Post(':moduleId')
  @UseGuards(EnrollmentGuard)
  async submit(
    @Param('moduleId', ParseIntPipe) moduleId: number,
    @Body() dto: CreateAssignmentDto,
    @Req() req,
  ) {
    const user = req.user;
    const module = await this.modulesService.findOne(moduleId);
    if (!module) throw new NotFoundException('Modul topilmadi');
    return this.assignmentsService.create(dto, user, module);
  }

  @Get('my')
  async getMyAssignments(@Req() req) {
    const userId = req.user.id;
    return this.assignmentsService.findByUser(userId);
  }
}

