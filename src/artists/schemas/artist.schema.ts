import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { TattooEventObject } from '../dto/tattoo-event.object';

export type ArtistDocument = HydratedDocument<Artist>;
export type ArtistModel = Model<Artist>;

@Schema({ timestamps: true })
export class Artist {
  id: string;

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  instagram: string;

  @Prop({ type: String, required: true, trim: true })
  description: string;

  @Prop({ type: String, required: true, trim: true })
  color: string;

  @Prop({ type: [TattooEventObject], required: false })
  eventList: TattooEventObject[];

  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
