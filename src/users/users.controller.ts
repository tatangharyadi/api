import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './entities/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() body: CreateUserDto) {
        const user = await this.userService.save(body);

        this.eventEmitter.emit('user.created', { email: user.email });

        return await this.userService.findOne({
            where: [{ email: user.email }],
        });
    }

    @Roles(Role.ADMIN)
    @Get()
    find() {
        return this.userService.find();
    }

    @Roles(Role.ADMIN)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.delete(+id);
    }
}
