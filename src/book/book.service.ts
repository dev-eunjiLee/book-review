import { Injectable } from '@nestjs/common';
import got from 'got';
import { ConfigService } from '@nestjs/config';
import { BOOK_FROM_NAVER_TYPE } from './book.entity';
import {
  ReadBookListInputDto,
  ReadBookListOutputDto,
} from './dtos/read.book.list.dto';
import { CustomGraphQLError } from '../common/common.graphql.error';
import {
  NAVER_BOOK_SEARCH_ERROR_BODY,
  NAVER_BOOK_SEARCH_ERROR_CODE_LIST,
} from './naver.book.type';
import { ERROR_CODE_ENUM } from '../common/error/error.code';

@Injectable()
export class BookService {
  constructor(private readonly configService: ConfigService) {}

  async readBookList(
    param: ReadBookListInputDto,
  ): Promise<ReadBookListOutputDto> {
    const basicUrl = `https://openapi.naver.com/v1/search/book.json`;

    const { keyword, pageNumber, pageSize } = param;

    const url = `${basicUrl}?query=${keyword}&start=${pageNumber}&display=${pageSize}`;

    let searchResult: BOOK_FROM_NAVER_TYPE;
    try {
      searchResult = await got(url, {
        headers: {
          'X-Naver-Client-Id':
            this.configService.get<string>('NAVER_CLIENT_ID'),
          'X-Naver-Client-Secret': this.configService.get<string>(
            'NAVER_CLIENT_SECRET',
          ),
        },
      }).json();
    } catch (e) {
      if (!e?.response?.body) {
        throw new CustomGraphQLError({
          message: e.message,
        });
      } else {
        const errBody = JSON.parse(
          e?.response?.body,
        ) as NAVER_BOOK_SEARCH_ERROR_BODY;

        if (NAVER_BOOK_SEARCH_ERROR_CODE_LIST.includes(errBody.errorCode)) {
          throw new CustomGraphQLError({
            message: errBody.errorMessage,
            errorCode: ERROR_CODE_ENUM.CALL_API_ERROR,
          });
        } else {
          throw new CustomGraphQLError({
            message: e.message,
          });
        }
      }
    }

    return {
      ...searchResult,
      bookList: searchResult.items,
    };
  }
}
