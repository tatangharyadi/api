import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, [
    'role',
] as const) {}
