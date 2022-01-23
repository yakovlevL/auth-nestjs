import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import Boom from 'boom';

import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../../dto/user.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const { email, password } = userDto;

    const candidate = await this.userService.getUserByEmail(email);

    if (candidate) {
      throw Boom.badRequest('User with this email already exists');
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity) {
    const { email, id } = user;
    const payload = { email, id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const { email, password } = userDto;

    const user = await this.userService.getUserByEmail(email);
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return user;
    }
  }
}
