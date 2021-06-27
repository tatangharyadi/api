import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RootModule } from './common/root.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [RootModule, UsersModule, AuthModule, OrdersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
