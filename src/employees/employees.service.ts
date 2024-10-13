import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from 'src/supabase';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
    async getAllEmployees() {
        try {
            const { data, error } = await supabase.from('Employees').select(`*`);
            if (error) throw error;

            return data;
        } catch (error) {
            throw error;
        }
    }

    async getEmployee(id: string) {
        try {
            const { data: employee, error } = await supabase.from('Employees').select(`*`).eq('id', id);

            if (!employee.length)
                throw new NotFoundException("No such Employee with this Id.", { cause: HttpStatus.NOT_FOUND, description: "Employee not found." });

            if (error) throw error;

            return employee;
        } catch (error) {
            throw error;
        }
    }

    async createEmployee(data: CreateEmployeeDto) {
        try {
            //check for the department's presence in the DB first.
            const { data: department, error: departmentFetchErr } = await supabase.from('Departments').select('name').eq('id', data.department_id);
            if (!department.length) throw new NotFoundException("No such department to link this employee to.", { cause: HttpStatus.NOT_FOUND, description: "No such department with this Id." });
            if (departmentFetchErr) throw departmentFetchErr;

            const { data: createdEmployee, error } = await supabase.from('Employees').insert([data]);
            if (error) throw error;

            return createdEmployee;
        } catch (error) {
            throw error;
        }
    }

    async updateEmployee(id: string, data: UpdateEmployeeDto) {
        try {
            const { data: updatedEmployee, error } = await supabase.from('Employee').update(data).eq('id', id).select(`*`);
            if (!updatedEmployee.length)
                throw new NotFoundException('Employee was not updated', { cause: HttpStatus.NOT_FOUND, description: 'No such Employee with this Id.' });
            if (error)
                throw error;

            return updatedEmployee;
        } catch (error) {
            throw error;
        }
    }

    async deleteEmployee(id: string) {
        try {
            const { data: existingEmployee, error: fetchingErr } = await supabase.from('Employees').select('id').eq('id', id);
            if (!existingEmployee.length) throw new NotFoundException('No such employee with this Id.', { cause: HttpStatus.NOT_FOUND, description: 'Employee not found.' });

            const { error } = await supabase.from('Employee').delete().eq('id', id);
            if (error) throw error;

            return { message: 'Employee deleted successfully.' };
        } catch (error) {
            throw error;
        }
    }
}
