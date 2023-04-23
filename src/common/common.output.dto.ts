import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class CommonOutputDto {
  @Field(() => Boolean)
  ok: boolean;
}
