import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import { ConfigService } from '@nestjs/config';
import {
  ReadBookListInputDto,
  ReadBookListOutputDto,
} from './types/dtos/read.book.list.dto';
import { CustomGraphQLError } from '../common/common.graphql.error';
import {
  NAVER_BOOK_SEARCH_ERROR_BODY,
  NAVER_BOOK_SEARCH_ERROR_CODE_LIST,
} from './types/basic/naver.book.error.type';
import { ERROR_CODE_ENUM } from '../common/error/error.code';
import { BOOK_FROM_NAVER_TYPE } from './types/basic/naver.book.type';
import { NAVER_BOOK_SEARCH_API_URL } from './types/basic/token';

@Injectable()
export class BookService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NAVER_BOOK_SEARCH_API_URL)
    private readonly naverBookSearchApiUrl: string,
  ) {}

  async readBookList(
    param: ReadBookListInputDto,
  ): Promise<ReadBookListOutputDto> {
    const { keyword, pageNumber, pageSize } = param;

    const url = `${this.naverBookSearchApiUrl}?query=${keyword}&start=${pageNumber}&display=${pageSize}`;

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
      // 네이버에서 넘어온 에러인 경우 처리와 그 외 에러 구분해서 처리
      if (e?.response?.body) {
        const errBody = JSON.parse(
          e?.response?.body,
        ) as NAVER_BOOK_SEARCH_ERROR_BODY;

        if (NAVER_BOOK_SEARCH_ERROR_CODE_LIST.includes(errBody.errorCode)) {
          throw new CustomGraphQLError({
            message: errBody.errorMessage,
            errorCode: ERROR_CODE_ENUM.CALL_API_ERROR,
          });
        }
      }

      throw e;
    }

    return {
      ...searchResult,
      bookList: searchResult.items,
    };
  }
}
