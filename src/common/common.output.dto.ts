import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class CommonOutputDto {
  @Field(() => Boolean, { defaultValue: true })
  ok = true;

  @Field(() => String, { nullable: true })
  requestId: string;
}
