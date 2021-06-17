import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Request,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CurrentUser } from './current-user.decorator';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post(['register'])
    async register(@Body() body: RegisterUserDto) {
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

        return this.userService.save({
            ...data,
            password: hashPassword,
        });
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) response: Response,
    ) {
        const jwt = this.authService.getToken(user);

        response.cookie('jwt', jwt, { httpOnly: true });

        return {
            user: user.email,
        };
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@CurrentUser() user: User) {
        return user;
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'Success',
        };
    }
}
