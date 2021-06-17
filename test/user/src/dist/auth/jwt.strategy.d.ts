import { User } from 'src/user.entity';
import { UserRepository } from 'src/user.repository';
import { JwtPayload } from './jwt.payload';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
