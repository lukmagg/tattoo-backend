import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { ArtistObject } from './dto/artist.object';

@Resolver(() => ArtistObject)
export class ArtistsResolver {
  constructor(private readonly usersService: ArtistsService) { }


  @Query(() => [ArtistObject], { name: 'users' })
  findAll(): Promise<ArtistObject[]> {
    return this.usersService.findAll();
  }


  @Query(() => ArtistObject, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<ArtistObject> {
    return this.usersService.findOne(id);
  }

  // @Mutation(() => ArtistObject)
  // updateArtist(@Args('updateArtistInput') updateArtistInput: UpdateArtistInput) {
  //   return this.usersService.update(updateArtistInput.id, updateArtistInput);
  // }

  // @Mutation(() => ArtistObject)
  // blockArtist(@Args('id', { type: () => ID }) id: string): Promise<ArtistObject> {
  //   return this.usersService.block(id);
  // }
}
