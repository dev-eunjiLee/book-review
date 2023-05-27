import { Mutation, Resolver } from '@nestjs/graphql';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}
  @Mutation(() => String)
  createReview() {
    return this.reviewService.createReview();
  }
}
