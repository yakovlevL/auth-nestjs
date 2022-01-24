import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../dto/user.dto';
import { AuthService } from './auth.service';
import { UserEntity } from '../../entities/user.entity';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    if (!userDto.email || !/^[^@]{1,}@[^.]{2,}\..{2,}$/.test(userDto.email)) {
      throw new HttpException('Incorrect email', HttpStatus.BAD_REQUEST);
    }

    if (!userDto.password) {
      throw new HttpException('Password is empty', HttpStatus.BAD_REQUEST);
    }
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, type: UserEntity })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    if (!userDto.email || !/^[^@]{1,}@[^.]{2,}\..{2,}$/.test(userDto.email)) {
      throw new HttpException('Incorrect email', HttpStatus.BAD_REQUEST);
    }

    if (!userDto.password) {
      throw new HttpException('Password is empty', HttpStatus.BAD_REQUEST);
    }
    return this.authService.registration(userDto);
  }
}
