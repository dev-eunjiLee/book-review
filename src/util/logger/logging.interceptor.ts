import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

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
            fieldName: string;
            input: { [key: string]: string };
          }
        | {
            method: string;
            path: string;
            query: { [key: string]: string };
            body: { [key: string]: string };
          };
    };

    if (contextType === CONTEXT.GRAPHQL) {
      const host = context.getArgs()[2].req.headers.host;
      const ctx = GqlExecutionContext.create(context);

      const { input } = ctx.getArgs();
      const { fieldName } = ctx.getInfo();
      content = {
        host,
        type: contextType,
        content: {
          fieldName,
          input,
        },
      };
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
    } else {
      throw Error('gql, http가 아닌 종류의 request 발생');
    }

    console.log(content);

    return next.handle().pipe(
      tap({
        next: (val: unknown) => {
          console.log('next');
          console.log(val);
        },
        error: (val: unknown) => {
          console.log('error');
          console.log(val);
        },
      }),
    );
  }
}
