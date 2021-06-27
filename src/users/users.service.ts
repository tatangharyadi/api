import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { TypeormService } from '../common/typeorm.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserCreatedEvent } from './events/user-created.event';

@Injectable()
export class UsersService extends TypeormService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly authService: AuthService,
    ) {
        super(userRepository);
    }

    async save(createUser: CreateUserDto): Promise<User> {
        const { passwordConfirm, ...data } = createUser;

        if (createUser.password !== passwordConfirm) {
            throw new BadRequestException('Confirm password do not match.');
        }

        const existingUser = await this.findOne({
            where: [{ email: createUser.email }],
        });

        if (existingUser) {
            throw new BadRequestException('Email already registered.');
        }

        const hashPassword = await this.authService.hashPassword(
            createUser.password,
        );

        return await this.userRepository.save({
            ...data,
            password: hashPassword,
        });
    }
}
