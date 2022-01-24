import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../entities/user.entity';
import { CreateUserDto } from '../../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async createUser(dto: CreateUserDto) {
    return this.userRepository.save(dto);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }
}
