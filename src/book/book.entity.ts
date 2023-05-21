import { Field, ObjectType } from '@nestjs/graphql';

// 네이버에서 넘어온 책 정보
export type BOOK_FROM_NAVER_TYPE = {
  lastBuildDate: Date; // 검색 결과 생성 날짜
  total: number; // 총 검색 결과 개수
  start: number; // 검색 시작 위치
  display: number; // 한 번에 표시할 검색 결과 개수
  items: Book[];
};

@ObjectType()
export class Book {
  @Field(() => String)
  title: string; // 책 제목
  @Field(() => String)
  link: string; // 네이버 도서 정보 URL
  @Field(() => String)
  image: string; // 썸네일 이미지의 URL
  @Field(() => String)
  author: string; // 저자 이름
  @Field(() => String)
  discount: number; // 판매 가격. 절판 등의 이유로 가격이 없으면 값을 반환하지 않음
  @Field(() => String)
  publisher: string; // 출판사 이름
  @Field(() => String)
  isbn: number; // ISBN
  @Field(() => String)
  description: string; // 네이버 도서의 책 소개
  @Field(() => String)
  pubdate: Date; // 출간일
}
