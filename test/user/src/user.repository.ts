import { EntityRepository, Repository } from 'typeorm';
import { AuthCredential } from './auth/dto/authCredential.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, username, type, password } = createUserDto;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.type = type;
    user.comments = ['null'];
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    await user.save();

    return user;
  }

  async login(authCredential: AuthCredential): Promise<User> {
    const { username, password } = authCredential;

    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user;
    }
  }
}
