import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Model } from 'mongoose';
import { User } from './../users/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthResolver', () => {
  let resolver: AuthResolver
  let jwtService: JwtService
  let authService: AuthService
  let userService: UsersService
  let userRepository: Model<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        AuthService,
        JwtService,
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        }],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver)
    jwtService = module.get<JwtService>(JwtService)
    authService = module.get<AuthService>(AuthService)
    userService = module.get<UsersService>(UsersService)
    userRepository = module.get<Model<User>>(getModelToken(User.name))

  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
