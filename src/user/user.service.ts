import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends CommonService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super(userRepository);
    }
}
