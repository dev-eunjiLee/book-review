import { GraphQLError, GraphQLErrorExtensions } from 'graphql/error';

export class CustomGraphQLError extends GraphQLError {
  extensions: GraphQLErrorExtensions;
  constructor(message: string, requestId: string) {
    super(message);
    this.extensions['requestId'] = requestId;
  }
}
