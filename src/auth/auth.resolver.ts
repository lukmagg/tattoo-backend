import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './schemas/auth.schema';
import { SignupInput } from './dto/signup.input';
import { AuthResponseObject } from './dto/auth-response';
import { SigninInput } from './dto/signin.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserObject } from './../users/dto/user.object';
import { ValidRoles } from './enums/valid-roles.enum';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseObject, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponseObject> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponseObject, { name: 'signin' })
  async signin(
    @Args('signinInput') signinInput: SigninInput,
  ): Promise<AuthResponseObject> {
    return this.authService.signin(signinInput);
  }

  @Query(() => AuthResponseObject, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(
    @CurrentUser(/*[ValidRoles.admin]*/) user: UserObject,
  ): AuthResponseObject {
    return this.authService.revalidateToken(user);
  }

  // @Mutation(() => Auth)
  // createAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
  //   return this.authService.create(createAuthInput);
  // }

  // @Query(() => [Auth], { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Query(() => Auth, { name: 'auth' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.findOne(id);
  // }

  // @Mutation(() => Auth)
  // updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
  //   return this.authService.update(updateAuthInput.id, updateAuthInput);
  // }

  // @Mutation(() => Auth)
  // removeAuth(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.remove(id);
  // }
}
