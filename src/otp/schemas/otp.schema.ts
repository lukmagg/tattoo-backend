import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;
export type OtpModel = Model<Otp>;

@Schema()
export class Otp {
    @Prop({ required: true })
    code: number;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    expire: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
