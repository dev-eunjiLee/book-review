import { Field, InputType, PickType } from '@nestjs/graphql';
import { Book } from 'src/book/types/entities/book.entity';
import { Review } from '../entities/review.entity';

@InputType()
export class BookForCreateReview extends PickType(Book, ['title', 'id']) {}

@InputType()
export class ReviewForCreateReview extends PickType(Review, [
  'title',
  'rate',
  'content',
]) {}
@InputType()
export class CreateReviewInputDto {
  @Field(() => BookForCreateReview)
  book: BookForCreateReview;

  @Field(() => ReviewForCreateReview)
  review: ReviewForCreateReview;
}
