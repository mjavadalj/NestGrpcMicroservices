import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthCredential } from './auth/dto/authCredential.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    addUser(createUserDto: CreateUserDto): Promise<User>;
    login(authCredential: AuthCredential): Promise<string>;
}
