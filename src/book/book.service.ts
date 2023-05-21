import { Injectable } from '@nestjs/common';
import got from 'got';
import { ConfigService } from '@nestjs/config';
import { BOOK_FROM_NAVER_TYPE } from './book.entity';
import {
  ReadBookListInputDto,
  ReadBookListOutputDto,
} from './dtos/read.book.list.dto';

@Injectable()
export class BookService {
  constructor(private readonly configService: ConfigService) {}
  async readBookList(
    param: ReadBookListInputDto,
  ): Promise<ReadBookListOutputDto> {
    const basicUrl = `https://openapi.naver.com/v1/search/book.json`;

    const { keyword, pageNumber, pageSize } = param;

    const url = `${basicUrl}?query=${keyword}&start=${pageNumber}&display=${pageSize}`;

    const result = (await got(url, {
      headers: {
        'X-Naver-Client-Id': this.configService.get<string>('NAVER_CLIENT_ID'),
        'X-Naver-Client-Secret': this.configService.get<string>(
          'NAVER_CLIENT_SECRET',
        ),
      },
    }).json()) as BOOK_FROM_NAVER_TYPE;

    return {
      ...result,
      bookList: result.items,
    };
  }
}
