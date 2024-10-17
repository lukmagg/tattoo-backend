import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() // Decorador para que esta clase sea un tipo de GraphQL
export class TattooEventObject {
  @Field(() => Date, { nullable: true }) // Decorador de campo para GraphQL
  start: Date;

  @Field(() => Date, { nullable: true })
  end: Date;

  @Field(() => String, { nullable: true })
  title: string;
}
