export const NAVER_BOOK_SEARCH_ERROR_CODE_LIST = [
  'SE01',
  'SE02',
  'SE03',
  'SE04',
  'SE05',
  'SE06',
  'SE99',
] as const;
type NAVER_BOOK_SEARCH_ERROR_CODE_LIST_TYPE =
  typeof NAVER_BOOK_SEARCH_ERROR_CODE_LIST[number];

export type NAVER_BOOK_SEARCH_ERROR_BODY = {
  errorMessage: string;
  errorCode: NAVER_BOOK_SEARCH_ERROR_CODE_LIST_TYPE;
};
