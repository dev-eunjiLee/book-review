import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { ConfigModule } from '@nestjs/config';
import { NAVER_BOOK_SEARCH_API_URL } from './types/basic/token';

@Module({
  imports: [ConfigModule],
  providers: [
    BookService,
    BookResolver,
    {
      provide: NAVER_BOOK_SEARCH_API_URL,
      useValue: 'https://openapi.naver.com/v1/search/book.json',
    },
  ],
  exports: [BookService],
})
export class BookModule {}
