import { InputType, Field } from '@nestjs/graphql';
import { TattooEventInput } from './tattoo-event.input';

@InputType()
export class CreateArtistInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => String, { nullable: false })
  instagram: string;

  @Field(() => String, { nullable: false })
  color: string;

  @Field(() => [TattooEventInput], { nullable: true })
  eventList: TattooEventInput[];

  @Field(() => Boolean, {
    nullable: true,
  })
  isActive: boolean;
}
