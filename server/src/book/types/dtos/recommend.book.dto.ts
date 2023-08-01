import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RecommendBookByChagGPTInputDto {
  @Field(() => [String])
  bookList: string[];
}
