export type BOOK_FROM_NAVER_TYPE = {
  lastBuildDate: Date;
  total: number; // 총 검색 결과 개수
  start: number; // 검색 시작 위치
  display: number; // 한 번에 표시할 검색 결과 개수
  items: {
    title: string; // 책 제목
    link: string; // 네이버 도서 정보 URL
    image: string; // 썸네일 이미지의 URL
    author: string; // 저자 이름
    discount: number; // 판매 가격. 절판 등의 이유로 가격이 없으면 값을 반환하지 않음
    publisher: string; // 출판사 이름
    isbn: number; // ISBN
    description: string; // 네이버 도서의 책 소개
    pubdate: Date; // 출간일
  };
};
