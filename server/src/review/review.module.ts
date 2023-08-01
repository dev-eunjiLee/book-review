import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [BookModule],
  providers: [ReviewService, ReviewResolver],
})
export class ReviewModule {}
