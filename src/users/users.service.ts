import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { UserObject } from './dto/user.object';
import { SignupInput } from 'src/auth/dto/signup.input';
import { User, UserModel } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService')

  constructor(
    @InjectModel(User.name)
    private readonly userRepository: UserModel,
  ) { }

  async create(signupInput: SignupInput): Promise<UserObject> {
    try {
      const encryptedPassword = await bcrypt.hash(signupInput.password, 10)

      const user = await this.userRepository.create({
        ...signupInput,
        password: encryptedPassword
      });

      return user;
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll(): Promise<UserObject[]> {
    return []
  }

  async findOne(id: string): Promise<UserObject> {
    throw new Error('not yet implemented')
  }

  async findOneByEmail(email: string): Promise<UserObject> {
    const user = await this.userRepository.findOne({ email })
    if (!user) {
      this.handleDBErrors({
        code: 'error-001',
        detail: 'Bad email or password'
      })
    }
    return user
  }

  async findOneById(id: string) {

    const user = await this.userRepository.findById(id)

    if (!user) {
      this.handleDBErrors({
        code: 'error-001',
        detail: 'id not found'
      })
    }
    return user
  }


  async update(id: number, updateUserInput: UpdateUserInput): Promise<UserObject> {
    throw new Error('not yet implemented')
  }

  // async block(id: string): Promise<User> {
  //   throw new Error('not yet implemented')
  // }

  private handleDBErrors(error: any): never {
    this.logger.error(error.detail)

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    if (error.code === 'error-001') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check server logs')
  }
}
