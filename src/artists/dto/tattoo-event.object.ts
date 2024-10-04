import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType() // Decorador para que esta clase sea un tipo de GraphQL
export class TattooEvent {
    @Field(() => Date) // Decorador de campo para GraphQL
    start: Date;

    @Field(() => Date)
    end: Date;

    @Field(() => String)
    title: string;
}