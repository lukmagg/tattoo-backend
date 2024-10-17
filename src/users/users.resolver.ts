import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserObject } from './dto/user.object';

@Resolver(() => UserObject)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserObject], { name: 'users' })
  findAll(): Promise<UserObject[]> {
    return this.usersService.findAll();
  }

  @Query(() => UserObject, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<UserObject> {
    return this.usersService.findOne(id);
  }

  // @Mutation(() => UserObject)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => UserObject)
  // blockUser(@Args('id', { type: () => ID }) id: string): Promise<UserObject> {
  //   return this.usersService.block(id);
  // }
}
