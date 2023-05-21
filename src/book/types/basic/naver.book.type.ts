// 네이버에서 넘어온 책 정보
import { Book } from '../entities/book.entity';

export type BOOK_FROM_NAVER_TYPE = {
  lastBuildDate: Date; // 검색 결과 생성 날짜
  total: number; // 총 검색 결과 개수
  start: number; // 검색 시작 위치
  display: number; // 한 번에 표시할 검색 결과 개수
  items: Book[];
};
