import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        CommonModule, //
        ConfigModule,
        UsersModule,
    ],
    providers: [LocalStrategy, JwtStrategy, RolesGuard, AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
