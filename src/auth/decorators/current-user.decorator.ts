import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const { user } = context.switchToHttp().getRequest();
        return user ?? null;
    },
);
