import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class OtpObject {

    @Field()
    code: number;

    @Field(() => String)
    phone: string;

    @Field(() => Date)
    expire: Date;
}