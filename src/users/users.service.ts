import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/types/UsersParams.type';
import { Repository } from 'typeorm';

import { User } from './User.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    findUsers() {
        return this.userRepository.find();
    }

    createUser(createUserDetails: CreateUserParams) {
        const user = this.userRepository.create(createUserDetails);
        return this.userRepository.save(user);
    }

    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...updateUserDetails });
    }
}
