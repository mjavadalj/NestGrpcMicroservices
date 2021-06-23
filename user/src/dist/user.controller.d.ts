import { OnModuleInit } from '@nestjs/common';
import { AuthCredential } from './auth/dto/authCredential.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
export declare class UserController implements OnModuleInit {
    private readonly userService;
    constructor(userService: UserService);
    private client;
    private grpcService;
    onModuleInit(): void;
    addProduct(id: number, name: string): Promise<import("rxjs").Observable<any>>;
    addUser(createUserDto: CreateUserDto): Promise<User>;
    login(authCredential: AuthCredential): Promise<string>;
}
