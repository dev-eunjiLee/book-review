// * ===== ===== * //
// * 출처: https://www.apollographql.com/docs/apollo-server/monitoring/metrics/
// * TODO: 플러그인 사용법 추가 공부 필요, 로그 셋팅 다시
// * ===== ===== * //

export const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext: any) {
    console.log('Request started! Query:\n' + requestContext.request.query);

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext: any) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext: any) {
        console.log('Validation started!');
      },
    };
  },
};
