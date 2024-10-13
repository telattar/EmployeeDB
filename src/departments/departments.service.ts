import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { supabase } from 'src/supabase';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
    async getAllDepartments() {
        try {
            const { data: departments, error } = await supabase.from('Departments').select(`*`);
            if (error) throw error;
            return departments;
        } catch (error) {
            return error;
        }
    }

    async getDepartmentById(id: string) {
        try {
            const { data: department, error } = await supabase.from('Departments').select(`*`).eq('id', id);
            if (!department.length)
                throw new NotFoundException('No such department with this Id.', { cause: HttpStatus.NOT_FOUND, description: "Department not found." });
            if (error)
                throw error;
        } catch (error) {
            throw error;
        }
    }

    async getDepartmentByName(name: string) {
        try {
            const { data: department, error } = await supabase.from('Departments').select(`*`).eq('name', name);
            if (!department.length)
                throw new NotFoundException('No such department with this name.', { cause: HttpStatus.NOT_FOUND, description: "Department not found." });
            if (error)
                throw error;

            return department;
        } catch (error) {
            throw error;
        }
    }

    async updateDepartment(id: string, data: UpdateDepartmentDto) {
        //let's only allow alterations using id
        try {
            const { data: updatedDepartment, error } = await supabase.from('Departments').update(data).eq('id', id).select(`*`);
            if (!updatedDepartment.length)
                throw new NotFoundException('Department was not updated', { cause: HttpStatus.NOT_FOUND, description: 'No such department with this Id.' });
            if (error)
                throw error;

            return updatedDepartment;
        } catch (error) {
            throw error;
        }
    }

    async createDepartment(data: CreateDepartmentDto) {
        try {
            const { data: createdDepartment, error } = await supabase.from('Departments').insert([data]);
            if (error)
                throw error;

            return createdDepartment;
        } catch (error) {
            if (error.code === '23505') //duplicate key insertion
                throw new ConflictException("You are trying to insert a key that already exists", { cause: HttpStatus.CONFLICT, description: error.message });
            else
                throw error;
        }
    }
}
