import { IsNotEmpty, IsString, IsUUID, Length, IsEmail, IsDate, IsInt, IsStrongPassword} from 'class-validator';

export class CreateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    last_name: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 8, 
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 2,  
        minSymbols: 0,
    })
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsUUID()
    department_id: string;

    @IsNotEmpty()
    @IsDate()
    birthdate: Date;

    //the age field should be handled in the backend server by computing today-birthdate
    @IsNotEmpty()
    @IsInt()
    age: number;
}