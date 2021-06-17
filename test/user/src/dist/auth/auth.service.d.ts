import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user.repository';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
}
