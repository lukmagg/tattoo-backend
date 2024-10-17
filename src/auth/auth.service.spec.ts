import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './../users/schemas/user.schema';
import { Model, Types } from 'mongoose';

const mockSignupInput = {
  username: 'testuser',
  password: 'password',
  email: 'test@test.com',
};

const mockUser = {
  id: '66fff18ddbd09316823b0ec3',
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'hashedpassword',
  eventList: [],
  isActive: true,
  roles: [],
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let userRepository: Model<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(), // Mockea el metodo `find` de Mongoose
            create: jest.fn(), // Mockea el metodo `create` de Mongoose
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should sign up a new user and return a token', async () => {
    jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);
    jest.spyOn(jwtService, 'sign').mockReturnValue('mockToken');

    const result = await authService.signup(mockSignupInput);

    expect(usersService.create).toHaveBeenCalledWith(mockSignupInput);
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: '66fff18ddbd09316823b0ec3',
    });
    expect(result).toEqual({
      token: 'mockToken',
      user: mockUser,
    });
  });
});
