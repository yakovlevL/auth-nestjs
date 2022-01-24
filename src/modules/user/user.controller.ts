import { Body, Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../../dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../entities/user.entity';
import { JwtAuthGuard } from '../../modules/auth/jwt-auth.guard';

@ApiTags('User controller')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: UserEntity })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get user info' })
  @ApiResponse({ status: 200, type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserInfo(@Request() req) {
    return this.userService.getUserByEmail(req.user.email);
  }
}
