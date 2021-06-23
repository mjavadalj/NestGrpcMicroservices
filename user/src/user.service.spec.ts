import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

//TODO: must mock  evthng else but service!
enum UserType {
  NORMAL = 'normal',
  VIP = 'vip',
}
const mockUserRepository = () => ({
  addUser: jest.fn(),
});
describe('User service', () => {
  let userService;
  let userRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
        JwtModule,
        PassportModule,
      ],
    }).compile();
    userService = await module.get<UserService>(UserService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });
  describe('add User', () => {
    it('add new user', async () => {
      userRepository.addUser.mockResolvedValue('something');
      expect(userRepository.addUser).not.toHaveBeenCalled();
      const filters: CreateUserDto = {
        firstName: 'javad',
        lastName: 'alj',
        type: UserType.NORMAL,
        username: 'javad13',
        password: '1234',
      };
      const result = await userService.addUser(filters);
      expect(userRepository.addUser).toHaveBeenCalled();
      expect(result).toEqual('something');
    });
  });
  //   describe('login', () => {
  //     it('succesfully logged in', async () => {});

  //     it('login  error - user not found', async () => {});
  //   });
});
