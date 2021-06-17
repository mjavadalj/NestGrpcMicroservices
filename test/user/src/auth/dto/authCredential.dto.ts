import { IsNotEmpty } from 'class-validator';

export class AuthCredential {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
