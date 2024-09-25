import { ObjectType, Field } from '@nestjs/graphql';
import { TattooEvent } from './tattoo-event.object';


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

    @Field(() => [TattooEvent], { nullable: true })
    eventList: TattooEvent[];

    @Field(() => Boolean, {
        nullable: false,
    })
    isActive: boolean;
}
