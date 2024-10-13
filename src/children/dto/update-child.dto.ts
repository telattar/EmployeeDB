import {IsNotEmpty, IsString, IsUUID, IsDate, Length } from 'class-validator'
export class UpdateChildDto {
    @IsNotEmpty()
    @IsString()
    @Length(2,20)
    first_name: string;

    //let's assume we cant change the employee id of the parent.

    @IsNotEmpty()
    @IsDate()
    birthdate: Date;

    @IsNotEmpty()
    @IsString()
    fav_color: string;
}