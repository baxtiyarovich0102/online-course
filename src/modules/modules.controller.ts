import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { EnrollmentGuard } from 'src/auth/guards/enrollment.guard';
import { LessonsService } from 'src/lessons/lessons.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService, private readonly lessonsService: LessonsService,) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher')
  create(@Body() dto: CreateModuleDto) {
    return this.modulesService.create(dto);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.modulesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateModuleDto) {
    return this.modulesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.modulesService.remove(id);
  }

   @UseGuards(JwtAuthGuard, EnrollmentGuard)
  @Get(':moduleId/lessons')
  findLessonsByModule(@Param('moduleId', ParseIntPipe) moduleId: number) {
    return this.lessonsService.findByModuleId(moduleId);
  }

}
