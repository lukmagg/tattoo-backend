import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';


const mockUserArray = [
  {
    _id: '1',
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'hashedpassword',
  },
  {
    _id: '2',
    username: 'testuser2',
    email: 'test2@example.com',
    password: 'hashedpassword2'
  }
]

const newUser = {
  username: 'test',
  email: 'test@test.com',
  password: '1234',
}

const mockUser = {
  _id: new Types.ObjectId(),  // Simula un ObjectId de Mongoose
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'hashedpassword',  // Esto asume que el password ya está hasheado
} as any;

describe('Testing User Service', () => {

  let service: UsersService
  let userRepository: Model<User>


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getModelToken(User.name),
        useValue: {
          find: jest.fn(), // Mockea el metodo `find` de Mongoose
          create: jest.fn(), // Mockea el metodo `create` de Mongoose
        },
      }],
    }).compile()

    service = module.get<UsersService>(UsersService)
    userRepository = module.get<Model<User>>(getModelToken(User.name))
  })


  it("Users service", () => {
    expect(service).toBeDefined()
  })

  it('Should return an array of users', async () => {

    jest.spyOn(userRepository, 'find').mockResolvedValue(mockUserArray)

    const users = await service.findAll()

    expect(users).toEqual(mockUserArray);
  })

  it('Shoul create a new user', async () => {

    jest.spyOn(userRepository, 'create').mockResolvedValue(mockUser)

    jest.spyOn(bcrypt, 'hash').mockImplementation(async (password: string, salt: number) => {
      return 'hashedpassword';
    });

    const user = await service.create(newUser)

    expect(userRepository.create).toHaveBeenCalledWith({
      ...newUser,
      password: 'hashedpassword',
    });

    expect(user).toEqual(mockUser)
  })


})