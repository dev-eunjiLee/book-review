import { Field, InputType, ObjectType } from '@nestjs/graphql';

// TODO: user, book db에 연결할 수 있도록 TypeORM 데코레이터까지 단 후 relation 연결 필요
@InputType('ReviewInputType')
@ObjectType()
export class Review {
  @Field(() => Number)
  bookId: number;

  @Field(() => Number)
  userId: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => Number)
  rate: number;
}
