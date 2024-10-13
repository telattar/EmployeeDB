import {IsString, IsStrongPassword, Length, IsEmail, IsDate, IsUUID, IsInt} from 'class-validator';

export class UpdateEmployeeDto {
    @IsString()
    @Length(2, 20)
    first_name: string;

    @IsString()
    @Length(2, 20)
    last_name: string;

    @IsString()
    @Length(6, 20)
    username: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8, 
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 2,  
        minSymbols: 0,
    })
    password: string;

    @IsEmail()
    email: string;

    @IsUUID()
    department_id: string;

    @IsDate()
    birthdate: Date;

    //the age field should be handled in the backend server by computing today-birthdate
    @IsInt()
    age: number;
}