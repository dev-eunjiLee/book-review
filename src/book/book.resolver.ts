import { Args, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { RecommendBookByChagGPTInputDto } from './types/dtos/recommend.book.dto';
import {
  SearchBookInputDto,
  SearchBookOutputDto,
} from './types/dtos/search.book.dto';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
  @Query(() => SearchBookOutputDto)
  async searchBook(
    @Args('input') param: SearchBookInputDto,
  ): Promise<SearchBookOutputDto> {
    return await this.bookService.searchBook(param);
  }

  @Query(() => String)
  async recommendBookByChagGPT(
    @Args('input') param: RecommendBookByChagGPTInputDto,
  ) {
    return await this.bookService.recommendBookByChatGPT(param);
  }
}
