import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'email should not be empty' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'name should not be empty' })
    @MinLength(5, { message: 'name is too short' })
    name: string;

    @IsNotEmpty({ message: 'password should not be empty' })
    @MinLength(5, { message: 'password is too short' })
    password: string;

    @IsNotEmpty({ message: 'role should not be empty' })
    role: string;
}
