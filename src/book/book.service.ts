import { Injectable } from '@nestjs/common';
import got from 'got';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BookService {
  constructor(private readonly configService: ConfigService) {}
  async readBookList() {
    const basicUrl = `https://openapi.naver.com/v1/search/book.json`;

    const url = `${basicUrl}?query=성경`;

    const t = await got(url, {
      headers: {
        'X-Naver-Client-Id': this.configService.get<string>('NAVER_CLIENT_ID'),
        'X-Naver-Client-Secret': this.configService.get<string>(
          'NAVER_CLIENT_SECRET',
        ),
      },
    }).json();

    console.log(t);

    return 'ok';
  }
}
