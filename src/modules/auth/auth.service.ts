import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

  async login(userDto: CreateUserDto): Promise<{ token: string }> {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto): Promise<{ token: string }> {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }

    throw new HttpException('Authentication filed', HttpStatus.FORBIDDEN);
  }
}
