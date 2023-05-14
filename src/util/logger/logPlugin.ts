// * ===== ===== * //
// * 출처: https://www.apollographql.com/docs/apollo-server/monitoring/metrics/
// * TODO: 플러그인 사용법 추가 공부 필요, 로그 셋팅 다시
// * ===== ===== * //

export const myPlugin = {
  async requestDidStart(requestContext: any) {
    const {
      request: {
        http: { method, headers },
      },
    } = requestContext;

    const host = headers.get('host');
    const query = requestContext.request.query;

    console.log(`${method}, ${host}, ${query}`);
  },
};
