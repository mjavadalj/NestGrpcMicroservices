import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

enum UserType {
  NORMAL = 'normal',
  VIP = 'vip',
}

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The type of user',
    default: 'normal',
    enum: ['normal', 'vip'],
  })
  type: UserType;

  @ApiProperty()
  password: string;

  // comments: string[];
}
