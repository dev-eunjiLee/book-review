import { Injectable } from '@nestjs/common';
import { BookService } from 'src/book/book.service';

@Injectable()
export class ReviewService {
  constructor(private readonly bookService: BookService) {}
  createReview() {
    // * 1. 유저가 선택한 책이 book DB에 있는지 확인
    const t = this.bookService.readBook();

    // * 2. bookDB에 없는 경우 DB에 저장

    // * 3. bookDB에서 책을 선택해서 연결한 후 리뷰 작성
    return 'ok';
  }
}
