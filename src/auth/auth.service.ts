import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthResponseObject } from './dto/auth-response';
import { SignupInput } from './dto/signup.input';
import { UsersService } from './../users/users.service';
import { SigninInput } from './dto/signin.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserObject } from 'src/users/dto/user.object';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupInput: SignupInput): Promise<AuthResponseObject> {
    const user = await this.usersService.create(signupInput);

    const token = this.jwtService.sign({ id: user.id });

    return {
      token,
      user,
    };
  }

  async signin(signinInput: SigninInput): Promise<AuthResponseObject> {
    const { email, password } = signinInput;

    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Email / Password do not match');
    }

    user.password = '';

    const token = this.jwtService.sign({ id: user.id, roles: user.roles });

    return {
      token,
      user,
    };
  }

  async validateUser(id: string) {
    const user = await this.usersService.findOneById(id);

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive.');
    }

    user.password = '';
    return user;
  }

  revalidateToken(user: UserObject): AuthResponseObject {
    const token = this.jwtService.sign({ id: user.id });

    return { token, user };
  }

  // create(createAuthInput: CreateAuthInput) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthInput: UpdateAuthInput) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
