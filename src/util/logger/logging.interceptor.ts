import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

const CONTEXT = {
  HTTP: 'http',
  GRAPHQL: 'graphql',
} as const;
export type CONTEXT_TYPE = typeof CONTEXT[keyof typeof CONTEXT];

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const contextType = context.getType() as CONTEXT_TYPE;

    let content: {
      host: string;
      type: CONTEXT_TYPE;
      content:
        | {
            query: string;
            input: string;
          }
        | {
            method: string;
            path: string;
            query: { [key: string]: string };
            body: { [key: string]: string };
          };
    };

    if (contextType === CONTEXT.GRAPHQL) {
    } else if (contextType === CONTEXT.HTTP) {
      const ctx = context.switchToHttp();
      const host = ctx.getRequest().headers.host;
      content = {
        host,
        type: contextType,
        content: {
          method: ctx.getRequest().method,
          path: ctx.getRequest().route.path,
          body: ctx.getRequest().body,
          query: ctx.getRequest().query,
        },
      };

      console.log('hi');
    } else {
      throw Error('gql, http가 아닌 종류의 request 발생');
    }

    return next.handle().pipe(
      tap({
        next: (val: unknown): void => {
          console.log('hi');
        },
        error: (err: Error): void => {
          console.log(err);
        },
      }),
    );
  }
}
