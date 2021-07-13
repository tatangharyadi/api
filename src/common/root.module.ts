import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { BuildServiceModule } from './build.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                POSTGRES_URL: Joi.required(),
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get('POSTGRES_URL'),
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
        EventEmitterModule.forRoot(),
        GraphQLGatewayModule.forRootAsync({
            useFactory: async () => ({
                server: {
                    context: ({ req, res }) => ({ req, res }),
                    playground: true,
                    //cors: true,
                },
                gateway: {
                    serviceList: [
                        {
                            name: 'Product',
                            url: 'http://graphql:3000/graphql',
                        },
                    ],
                },
            }),
            imports: [BuildServiceModule],
            inject: [GATEWAY_BUILD_SERVICE],
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get('SMTP_HOST'),
                    port: configService.get('SMTP_PORT'),
                },
                defaults: {
                    from: configService.get('NO_REPLY'),
                },
            }),
        }),
    ],
})
export class RootModule {}
