import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateReviewInputDto } from './dtos/create.review.dto';
import { ReviewService } from './review.service';

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}
  @Mutation(() => String)
  createReview(@Args('input') param: CreateReviewInputDto) {
    return this.reviewService.createReview(param);
  }
}
