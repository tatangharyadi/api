import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserCreatedEvent } from './events/user-created.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @Post()
    async create(@Body() body: CreateUserDto) {
        const { passwordConfirm, ...data } = body;

        if (body.password !== passwordConfirm) {
            throw new BadRequestException('Confirm password do not match.');
        }

        const existingUser = await this.userService.findOne({
            where: [{ email: body.email }],
        });

        if (existingUser) {
            throw new BadRequestException('Email already registered.');
        }

        const hashPassword = await this.authService.hashPassword(body.password);

        await this.userService.save({
            ...data,
            password: hashPassword,
        });

        const userCreatedEvent = new UserCreatedEvent();
        userCreatedEvent.email = data.email;
        this.eventEmitter.emit('user.created', userCreatedEvent);

        return this.userService.findOne({
            where: [{ email: body.email }],
        });
    }

    @Get()
    find() {
        return this.userService.find();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.delete(+id);
    }
}
