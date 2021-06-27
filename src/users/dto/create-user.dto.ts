import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { Role } from '../entities/role.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    passwordConfirm: string;

    @IsOptional()
    @IsEnum({ entity: Role, default: Role.USER })
    role?: Role;
}
