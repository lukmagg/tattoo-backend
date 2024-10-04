import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UpdateArtistInput } from './dto/update-artist.input';
import { ArtistObject } from './dto/artist.object';
import { SignupInput } from 'src/auth/dto/signup.input';
import { Artist, ArtistModel } from './schemas/artist.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ArtistsService {

  private logger = new Logger('ArtistsService')

  constructor(
    @InjectModel(Artist.name)
    private readonly userRepository: ArtistModel,
  ) { }

  async create(signupInput: SignupInput): Promise<ArtistObject> {
    try {
      const encryptedPassword = await bcrypt.hash(signupInput.password, 10)

      const user = await this.userRepository.create({
        ...signupInput,
        password: encryptedPassword
      });

      return user;
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll(): Promise<ArtistObject[]> {
    return []
  }

  async findOne(id: string): Promise<ArtistObject> {
    throw new Error('not yet implemented')
  }

  async findOneByEmail(email: string): Promise<ArtistObject> {
    const user = await this.userRepository.findOne({ email })
    if (!user) {
      this.handleDBErrors({
        code: 'error-001',
        detail: 'Bad email or password'
      })
    }
    return user
  }

  async findOneById(id: string) {

    const user = await this.userRepository.findById(id)

    if (!user) {
      this.handleDBErrors({
        code: 'error-001',
        detail: 'id not found'
      })
    }
    return user
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
