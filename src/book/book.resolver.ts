import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import {
  SearchBookInputDto,
  SearchBookOutputDto,
} from './types/dtos/read.book.list.dto';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
  @Query(() => SearchBookOutputDto)
  async searchBook(
    @Args('input') param: SearchBookInputDto,
  ): Promise<SearchBookOutputDto> {
    return await this.bookService.searchBook(param);
  }
}
