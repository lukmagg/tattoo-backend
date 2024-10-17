import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';
import { Model } from 'mongoose';
import { Artist } from './schemas/artist.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ArtistsResolver', () => {
  let resolver: ArtistsResolver;
  let artistService: ArtistsService;
  let artistRepository: Model<Artist>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistsResolver,
        ArtistsService,
        {
          provide: getModelToken(Artist.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ArtistsResolver>(ArtistsResolver);
    artistService = module.get<ArtistsService>(ArtistsService);
    artistRepository = module.get<Model<Artist>>(getModelToken(Artist.name));
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
