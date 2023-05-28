import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { Book } from 'src/book/types/entities/book.entity';
import { Review } from '../entities/review.entity';

@InputType()
export class CreateReviewInputDto extends IntersectionType(
  PickType(Book, ['title']),
  PickType(Review, ['title', 'rate', 'content']),
) {}
