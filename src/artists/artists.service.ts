import { Injectable } from '@nestjs/common';
import { UpdateArtistInput } from './dto/update-artist.input';
import { ArtistObject } from './dto/artist.object';
import { Artist, ArtistModel } from './schemas/artist.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArtistInput } from './dto/create-artist.input';
import { handleDBErrors } from '../lib/handleDBErrors';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectModel(Artist.name)
    private readonly artistRepository: ArtistModel,
  ) { }

  async create(createArtistInput: CreateArtistInput): Promise<ArtistObject> {
    try {
      const artist = await this.artistRepository.create(createArtistInput);

      return artist;
    } catch (error) {
      console.log('createArtistInput');
      console.log(createArtistInput);
      handleDBErrors(error, 'ArtistsService');
    }
  }

  async findAll(): Promise<ArtistObject[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<ArtistObject> {
    throw new Error('not yet implemented');
  }

  async findOneById(id: string) {
    const artist = await this.artistRepository.findById(id);

    if (!artist) {
      handleDBErrors(
        {
          code: 'error-001',
          detail: 'id not found',
        },
        'ArtistsService',
      );
    }
    return artist;
  }

  // async update(
  //   id: number,
  //   updateArtistInput: UpdateArtistInput,
  // ): Promise<ArtistObject> {
  //   throw new Error('not yet implemented');
  // }

  // async block(id: string): Promise<Artist> {
  //   throw new Error('not yet implemented')
  // }
}
