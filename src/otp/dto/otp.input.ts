import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OtpInput {
  @Field()
  code: number;

  @Field(() => String)
  phone: string;

  @Field(() => Date)
  expire: Date;
}
