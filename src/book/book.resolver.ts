import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import {
  ReadBookListInputDto,
  ReadBookListOutputDto,
} from './types/dtos/read.book.list.dto';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
  @Query(() => ReadBookListOutputDto)
  async readBookList(
    @Args('input') param: ReadBookListInputDto,
  ): Promise<ReadBookListOutputDto> {
    return await this.bookService.readBookList(param);
  }
}
