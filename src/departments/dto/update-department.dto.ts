import { IsNotEmpty } from 'class-validator';

export class UpdateDepartmentDto {
    //let's assume that a department name can not be changed.
    @IsNotEmpty()
    description: string;
}