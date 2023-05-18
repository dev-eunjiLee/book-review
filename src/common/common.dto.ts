import { Field, InputType } from '@nestjs/graphql';

@InputType('UserInputType')
export class CommonDto {
  @Field(() => String, { nullable: true })
  requestId: string;
}
