import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private userService: UsersService) {
        super({ usernameField: 'email' });
    }

    public async validate(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne({
            where: { email },
        });

        if (!user) {
            this.logger.warn(`Invalid login for user ${email}`);
            throw new UnauthorizedException();
        }

        if (!(await bcrypt.compare(password, user.password))) {
            this.logger.warn(`Invalid password for user ${email}`);
            throw new UnauthorizedException();
        }

        return user;
    }
}
