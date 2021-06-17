import { IsNotEmpty } from 'class-validator';

enum UserType {
  NORMAL = 'normal',
  VIP = 'vip',
}

export class CreateUserDto {
  firstName: string;
  lastName: string;

  @IsNotEmpty()
  username: string;

  type: UserType;

  password: string;

  comments: string[];
}
