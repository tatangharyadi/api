import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserListener } from './listeners/user.listener';
import { UploadController } from './upload.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), //
        forwardRef(() => AuthModule),
    ],
    controllers: [UsersController, UploadController],
    providers: [UsersService, UserListener],
    exports: [UsersService],
})
export class UsersModule {}
