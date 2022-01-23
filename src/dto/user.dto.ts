import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'example@mail.com', description: 'Email' })
  readonly email: string;
  @ApiProperty({ description: 'Password' })
  readonly password: string;
}
