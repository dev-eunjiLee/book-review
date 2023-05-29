import { Injectable } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { CreateReviewInputDto } from './dtos/create.review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly bookService: BookService) {}
  async createReview(param: CreateReviewInputDto) {
    console.log(param);
    // * 1. 유저가 선택한 책이 book DB에 있는지 확인
    const pickedBook = await this.bookService.readBook(param.book);

    // * 2. bookDB에 없는 경우 DB에 저장
    // if (pickedBook === undefined) {
    // TODO 책 검색 시작
    // }

    // * 3. bookDB에서 책을 선택해서 연결한 후 리뷰 작성
    return 'ok';
  }
}
