import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DeleteDateColumn } from 'typeorm';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeeServices: EmployeesService) { }

    @Get()
    async getAllEmployees() {
        return await this.employeeServices.getAllEmployees();
    }

    @Get(':id')
    async getEmployee(@Param() id: string) {
        return this.employeeServices.getEmployee(id);
    }

    @Post()
    async createEmployee(@Body() data: CreateEmployeeDto) {
        return await this.employeeServices.createEmployee(data);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateEmployee(@Param() id: string, @Body() data: UpdateEmployeeDto) {
        return await this.employeeServices.updateEmployee(id, data);
    }

    @Delete(':id')
    async deleteEmployee(@Param() id: string) {
        return await this.employeeServices.deleteEmployee(id);
    }

}
