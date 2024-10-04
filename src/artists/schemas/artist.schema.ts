import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { TattooEvent } from '../dto/tattoo-event.object';

export type ArtistDocument = HydratedDocument<Artist>;
export type ArtistModel = Model<Artist>;

@Schema({ timestamps: true })
export class Artist {

  id: string;

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ type: String, required: false, trim: true })
  description: string;

  @Prop({ type: String, required: true, trim: true })
  color: string;

  @Prop({ type: [TattooEvent], required: false })
  eventList: TattooEvent[];

  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

}


export const ArtistSchema = SchemaFactory.createForClass(Artist);
