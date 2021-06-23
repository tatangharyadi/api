import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'ORDERS_SERVICE',
            useFactory: (configService: ConfigService) => {
                const url = configService.get('RABBITMQ_URL');
                const queue = configService.get('ORDER_QUEUE');

                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [url],
                        queue: queue,
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
            inject: [ConfigService],
        },
    ],
    controllers: [OrdersController],
})
export class OrdersModule {}
