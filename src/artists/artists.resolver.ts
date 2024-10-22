import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { ArtistObject } from './dto/artist.object';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';

@Resolver(() => ArtistObject)
export class ArtistsResolver {
  constructor(private readonly artistService: ArtistsService) { }

  @Mutation(() => ArtistObject, { name: 'createArtist' })
  create(@Args('createArtistInput') createArtistInput: CreateArtistInput) {
    return this.artistService.create(createArtistInput);
  }

  @Query(() => [ArtistObject], { name: 'artists' })
  findAll(): Promise<ArtistObject[]> {
    return this.artistService.findAll();
  }

  @Query(() => ArtistObject, { name: 'artist' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<ArtistObject> {
    return this.artistService.findOne(id);
  }

  @Mutation(() => ArtistObject)
  updateArtist(
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
  ) {
    return this.artistService.update(updateArtistInput.id, updateArtistInput);
  }


  @Mutation(() => ArtistObject)
  activateArtist(@Args('id', { type: () => ID }) id: string): Promise<ArtistObject> {
    return this.artistService.activate(id);
  }


  // @Mutation(() => ArtistObject)
  // blockArtist(@Args('id', { type: () => ID }) id: string): Promise<ArtistObject> {
  //   return this.usersService.block(id);
  // }


}
