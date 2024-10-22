import { CreateArtistInput } from './create-artist.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateArtistInput extends PartialType(CreateArtistInput) {
  @Field(() => String)
  id: string;
}
