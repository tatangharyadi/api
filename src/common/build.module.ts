import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';

const requestHeaders: Array<string> = ['cookie', 'user-agent'];

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    async willSendRequest({ request, context }) {
        if (context.req?.headers) {
            requestHeaders.forEach((h) => {
                if (context.req.headers[h]) {
                    request.http.headers.set(h, context.req.headers[h]);
                }
            });
        }
    }
}

@Module({
    providers: [
        {
            provide: AuthenticatedDataSource,
            useValue: AuthenticatedDataSource,
        },
        {
            provide: GATEWAY_BUILD_SERVICE,
            useFactory: (AuthenticatedDataSource) => {
                return ({ name, url }) => new AuthenticatedDataSource({ url });
            },
            inject: [AuthenticatedDataSource],
        },
    ],
    exports: [GATEWAY_BUILD_SERVICE],
})
export class BuildServiceModule {}
