import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserObject {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => [String])
  roles: string[];

  @Field(() => Boolean, {
    nullable: false,
  })
  isActive: boolean;
}
