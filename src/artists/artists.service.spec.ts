import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsService } from './artists.service';
import { Model, Types } from 'mongoose';
import { Artist } from './schemas/artist.schema';
import { getModelToken } from '@nestjs/mongoose';

const mockArtistArray = [
  {
    _id: '1',
    name: 'testuser',
    description: 'description',
    color: 'red',
    eventList: [],
    isActive: true,
  },
  {
    _id: '2',
    name: 'testuser2',
    description: 'description',
    color: 'blue',
    eventList: [],
    isActive: true,
  },
];

const newArtist = {
  name: 'test',
  description: 'description',
  color: 'blue',
  eventList: [],
  isActive: true,
};

const mockArtist = {
  _id: new Types.ObjectId(), // Simula un ObjectId de Mongoose
  name: 'testuser',
  description: 'description', // Esto asume que el password ya está hasheado
  color: 'blue',
  eventList: [],
  isActive: true,
} as any;

describe('Testing Artists service', () => {
  let service: ArtistsService;
  let artistRepository: Model<Artist>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistsService,
        {
          provide: getModelToken(Artist.name),
          useValue: {
            find: jest.fn(), // Mockea el metodo `find` de Mongoose
            create: jest.fn(), // Mockea el metodo `create` de Mongoose
          },
        },
      ],
    }).compile();

    service = module.get<ArtistsService>(ArtistsService);
    artistRepository = module.get<Model<Artist>>(getModelToken(Artist.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return an array of artists', async () => {
    jest.spyOn(artistRepository, 'find').mockResolvedValue(mockArtistArray);

    const artists = await service.findAll();

    expect(artists).toEqual(mockArtistArray);
  });

  it('Shoul create a new artist', async () => {
    jest.spyOn(artistRepository, 'create').mockResolvedValue(mockArtist);

    const artist = await service.create(newArtist);

    expect(artistRepository.create).toHaveBeenCalledWith({
      ...newArtist,
    });

    expect(artist).toEqual(mockArtist);
  });
});
