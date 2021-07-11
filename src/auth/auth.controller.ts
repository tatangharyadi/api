import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    @Post('register')
    async register(@Body() body: RegisterUserDto) {
        const user = await this.userService.save(body);

        this.eventEmitter.emit('user.created', { email: user.email });

        return await this.userService.findOne({
            where: [{ email: user.email }],
        });
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) response: Response,
    ) {
        const jwt = this.authService.getToken(user);

        if (this.configService.get('JWT_DELIVERY') === 'cookie') {
            response.cookie('jwt', jwt, { httpOnly: true });
            return { user: user.email };
        } else {
            return { access_token: jwt };
        }
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@CurrentUser() user: User) {
        return user;
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@Res({ passthrough: true }) response: Response) {
        if (this.configService.get('JWT_DELIVERY') === 'cookie') {
            response.clearCookie('jwt');
        }

        return {
            message: 'Success',
        };
    }
}
