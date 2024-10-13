import {IsNotEmpty, IsString, IsUUID, IsDate, Length } from 'class-validator'
export class CreateChildDto {
    @IsNotEmpty()
    @IsString()
    @Length(2,20)
    first_name: string;

    @IsNotEmpty()
    @IsUUID()
    employee_id: string;

    @IsNotEmpty()
    @IsDate()
    birthdate: Date;

    @IsNotEmpty()
    @IsString()
    fav_color: string;
}