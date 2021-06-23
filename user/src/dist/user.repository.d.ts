import { Repository } from 'typeorm';
import { AuthCredential } from './auth/dto/authCredential.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
export declare class UserRepository extends Repository<User> {
    private hashPassword;
    addUser(createUserDto: CreateUserDto): Promise<User>;
    login(authCredential: AuthCredential): Promise<User>;
}
