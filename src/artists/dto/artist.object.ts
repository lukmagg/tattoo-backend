import { ObjectType, Field } from '@nestjs/graphql';
import { TattooEvent } from './tattoo-event.object';


@ObjectType()
export class ArtistObject {
    @Field(() => String)
    id: string;

    @Field(() => String, { nullable: false })
    name: string;

    @Field(() => String, { nullable: false })
    description: string;

    @Field(() => String, { nullable: false })
    email: string;

    @Field(() => String, { nullable: false })
    color: string;

    @Field(() => [TattooEvent], { nullable: true })
    eventList: TattooEvent[];

    @Field(() => Boolean, {
        nullable: false,
    })
    isActive: boolean;
}
