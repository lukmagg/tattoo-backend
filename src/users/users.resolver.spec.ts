import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let userService: UsersService;
  let userRepository: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
