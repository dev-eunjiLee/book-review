import { Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
  @Query(() => String)
  readBookList() {
    return this.bookService.readBookList();
  }
}
