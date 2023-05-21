import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Book } from '../book.entity';
import { Max } from 'class-validator';

@InputType()
export class ReadBookListInputDto {
  @Field(() => String)
  keyword: string;
  @Field(() => Number, { defaultValue: 1 })
  @Max(100)
  pageNumber: number;
  @Field(() => Number, { defaultValue: 10 })
  @Max(100)
  pageSize: number;
}

@ObjectType()
export class ReadBookListOutputDto {
  @Field(() => Number, { description: '총 검색 결과 개수' })
  total: number;
  @Field(() => Number, { description: '검색 시작 위치' })
  start: number;
  @Field(() => Number, { description: '한 번에 표시할 검색 결과 개수' })
  display: number;
  @Field(() => [Book])
  bookList: Book[];
}
