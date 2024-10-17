import { ObjectType, Field } from '@nestjs/graphql';
import { TattooEventObject } from './tattoo-event.object';

@ObjectType()
export class ArtistObject {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  instagram: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  color: string;

  @Field(() => [TattooEventObject], { nullable: true })
  eventList: TattooEventObject[];

  @Field(() => Boolean, {
    nullable: true,
  })
  isActive: boolean;
}
