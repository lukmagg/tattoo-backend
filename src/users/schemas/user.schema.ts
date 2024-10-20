import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserModel = Model<User>;

// Users are client or admin
@Schema({ timestamps: true })
export class User {
  id: string;

  @Prop({ type: String, required: true, trim: true })
  username: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [String], required: true })
  roles: string[];

  @Prop({ type: String, required: false, trim: true })
  description: string;

  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
