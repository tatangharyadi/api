import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    public getToken(user: User): string {
        return this.jwtService.sign({
            username: user.email,
            sub: user.id,
        });
    }

    public async hashPassword(password: string): Promise<String> {
        return await bcrypt.hash(password, 10);
    }
}
