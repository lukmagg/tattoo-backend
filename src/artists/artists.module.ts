import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsResolver } from './artists.resolver';
import { ArtistObject } from './dto/artist.object';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './schemas/artist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  providers: [ArtistsResolver, ArtistsService, ArtistObject],
})
export class ArtistsModule {}
