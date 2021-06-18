import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        CommonModule, //
        ConfigModule,
        UserModule,
    ],
    providers: [LocalStrategy, JwtStrategy, AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
