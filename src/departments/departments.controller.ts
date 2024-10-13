import { Body, ConflictException, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { supabase } from 'src/supabase';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  //there's no need to instantiate classes in nestjs, it will do it automatically behind the scenes.
  constructor(private readonly departmentsService: DepartmentsService) { }

  @Get()
  async getAllDepartments() {
    return await this.departmentsService.getAllDepartments();
  }

  @Get('id/:id')
  async getDepartmentById(@Param('id') id: string) {
    return await this.departmentsService.getDepartmentById(id);
  }

  @Get('name/:name')
  async getDepartmentByName(@Param('name') name: string) {
    return await this.departmentsService.getDepartmentByName(name);
  }

  @Post()
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentsService.createDepartment(createDepartmentDto);
  }


  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateDepartment(@Param('id') id: string, @Body() newDetails: UpdateDepartmentDto) {
    return await this.departmentsService.updateDepartment(id, newDetails);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: string) {
    return await this.departmentsService.deleteDepartment(id);
  }
}
