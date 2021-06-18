import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
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
    controllers: [UserController, UploadController],
    providers: [UserService, UserListener],
    exports: [UserService],
})
export class UserModule {}
