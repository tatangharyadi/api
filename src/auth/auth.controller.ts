import {
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

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(
        @Request() request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const jwt = this.authService.getToken(request.user);

        response.cookie('jwt', jwt, { httpOnly: true });

        return {
            user: request.user.email,
        };
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Request() request) {
        return request.user;
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
