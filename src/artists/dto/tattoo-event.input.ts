import { InputType, Field } from '@nestjs/graphql';

@InputType() // Decorador para que esta clase sea un tipo de GraphQL
export class TattooEventInput {
  @Field(() => Date, { nullable: false }) // Decorador de campo para GraphQL
  start: Date;

  @Field(() => Date, { nullable: false })
  end: Date;

  @Field(() => String, { nullable: false })
  title: string;
}
