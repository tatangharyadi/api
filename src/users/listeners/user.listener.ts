import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';

@Injectable()
export class UserListener {
    constructor(private mailerService: MailerService) {}

    @OnEvent('user.created')
    async handleUserCreatedEvent(event: UserCreatedEvent) {
        await this.mailerService.sendMail({
            to: event.email,
            subject: 'Welcome',
            html: `Your have registered using your ${event.email} email`,
        });
    }
}
