import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthCredential } from './auth/dto/authCredential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.addUser(createUserDto);
  }
  async login(authCredential: AuthCredential) {
    const user = this.userRepository.login(authCredential);
    const username = (await user).username;
    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }
}
