import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UpdateArtistInput } from './dto/update-artist.input';
import { ArtistObject } from './dto/artist.object';
import { SignupInput } from 'src/auth/dto/signup.input';
import { Artist, ArtistModel } from './schemas/artist.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CreateArtistInput } from './dto/create-artist.input';

@Injectable()
export class ArtistsService {

  private logger = new Logger('ArtistsService')

  constructor(
    @InjectModel(Artist.name)
    private readonly artistRepository: ArtistModel,
  ) { }

  async create(createArtistInput: CreateArtistInput): Promise<ArtistObject> {
    try {
      const artist = await this.artistRepository.create(createArtistInput);

      return artist;
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll(): Promise<ArtistObject[]> {
    return await this.artistRepository.find()
  }

  async findOne(id: string): Promise<ArtistObject> {
    throw new Error('not yet implemented')
  }

  async findOneByEmail(email: string): Promise<ArtistObject> {
    const artist = await this.artistRepository.findOne({ email })
    if (!artist) {
      this.handleDBErrors({
        code: 'error-001',
        detail: 'Bad email or password'
      })
    }
    return artist
  }

  async findOneById(id: string) {

    const artist = await this.artistRepository.findById(id)

    if (!artist) {
      this.handleDBErrors({
        code: 'error-001',
        detail: 'id not found'
      })
    }
    return artist
  }


  async update(id: number, updateArtistInput: UpdateArtistInput): Promise<ArtistObject> {
    throw new Error('not yet implemented')
  }

  // async block(id: string): Promise<Artist> {
  //   throw new Error('not yet implemented')
  // }

  private handleDBErrors(error: any): never {
    this.logger.error(error.detail)

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    if (error.code === 'error-001') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check server logs')
  }
}
