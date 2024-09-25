import { Field, ObjectType } from '@nestjs/graphql';
import { UserObject } from './../../users/dto/user.object'

@ObjectType()
export class AuthResponseObject {
  @Field(() => String)
  token: string;
  @Field(() => UserObject)
  user: UserObject;
}
