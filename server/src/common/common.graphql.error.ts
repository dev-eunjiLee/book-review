import { GraphQLError, GraphQLErrorExtensions } from 'graphql/error';
import { ERROR_CODE_ENUM } from './error/error.code';

export class CustomGraphQLError extends GraphQLError {
  extensions: GraphQLErrorExtensions;
  constructor(option: {
    message: string;
    errorCode?: ERROR_CODE_ENUM;
    requestId?: string;
  }) {
    super(option.message);
    if (!option.errorCode) {
      option.errorCode = ERROR_CODE_ENUM.UNEXPECTED;
    }
    this.extensions['errorCode'] = option.errorCode;
    this.extensions['requestId'] = option.requestId;
  }
}
