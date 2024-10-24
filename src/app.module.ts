import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TwilioModule } from './providers/twilio/twilio.module';
import { OtpModule } from './otp/otp.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/db-1009'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: true,
        playground: configService.get<string>('CURRENT_ENV') === 'dev',
      }),
      inject: [ConfigService],
    }),
    ArtistsModule,
    UsersModule,
    AuthModule,
    OtpModule,
    TwilioModule,
  ],
  providers: [],
})
export class AppModule {}
