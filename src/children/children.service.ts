import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { supabase } from 'src/supabase';
import { UpdateChildDto } from './dto/update-child.dto';
import { panel } from 'src/main';

@Injectable()
export class ChildrenService {
    async createChlid(data: CreateChildDto) {
        try {
            //check if parent employee exists.
            const { data: parentEmployee, error: fetchingErr } = await supabase.from('Employees').select('id').eq('id', data.employee_id);
            if (!parentEmployee.length) throw new NotFoundException('The parent employee is not found', { cause: HttpStatus.NOT_FOUND, description: 'Employee not found' });
            if (fetchingErr) throw fetchingErr;

            const { data: createdChild, error } = await supabase.from('Children').insert([data]);
            if (error) throw error;

            return createdChild;
        } catch (error) {
            throw error;
        }
    }

    async getAllChildren() {
        try {
            const { data: children, error } = await supabase.from('Children').select(`*`);
            if (error) throw error;

            return children;
        } catch (error) {
            throw error;
        }
    }

    async getChild(id: string) {
        try {
            const { data: child, error } = await supabase.from('Children').select('*').eq('id', id);
            if (!child.length) throw new NotFoundException('There is no such child with this Id.', { cause: HttpStatus.NOT_FOUND, description: 'Child not found.' });
            if (error) throw error;

            return child;
        } catch (error) {
            throw error;
        }
    }

    async updateChild(id: string, data: UpdateChildDto) {
        try {
            const { data: updatedChild, error } = await supabase.from('Children').update(data).eq('id', id).select(`*`);
            if (!updatedChild.length)
                throw new NotFoundException('Child was not updated', { cause: HttpStatus.NOT_FOUND, description: 'No such child with this Id.' });
            if (error)
                throw error;

            return updatedChild;
        } catch (error) {
            throw error;
        }
    }

    async deleteChild(id: string) {
        try {
            const { data: existingChild, error: fetchingErr } = await supabase.from('Children').select('id').eq('id', id);
            if (!existingChild.length) throw new NotFoundException('No such child with this Id.', { cause: HttpStatus.NOT_FOUND, description: 'child not found.' });

            const { error } = await supabase.from('Children').delete().eq('id', id);
            if (error) throw error;

            panel.track("A child has been deleted.")
            return { message: 'Child deleted successfully.' };
        } catch (error) {
            throw error;
        }
    }
}

