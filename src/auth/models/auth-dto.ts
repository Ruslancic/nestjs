import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class RegisterRO {
    name: string;
    email: string;
    password: string;
}

export class LoginDTO {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
