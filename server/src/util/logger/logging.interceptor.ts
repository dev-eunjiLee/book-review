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
// type CONTEXT_TYPE = typeof CONTEXT['HTTP' | 'GRAPHQL']; 과 동일하다 => value를 union type으로 뽑아낸다
export type CONTEXT_TYPE = (typeof CONTEXT)[keyof typeof CONTEXT];

export type REQUEST_LOG_CONTENT_TYPE = {
  host: string;
  type: CONTEXT_TYPE;
  randomId: string;
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

export const applyRequestId = (
  context: GqlExecutionContext,
  randomId: string,
): void => {
  context['args'][1]['input']['requestId'] = randomId;
};

const setOutputLog = (content: any): { [key: string]: string } => {
  let output: any;
  if (typeof content === 'string') {
    output = content.length > 1000 ? content.substring(0, 1000) : content;
  } else {
    const keys = Object.keys(content);

    const output: { [key: string]: string } = {};

    keys.forEach((key) => {
      const strValue = JSON.stringify(content[key]);
      if (strValue.length > 1000)
        output[key] = `${strValue.substring(0, 1000)}...`;
      else output[key] = strValue;
    });
    console.log(333);
  }
  return output;
};
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const contextType = context.getType() as CONTEXT_TYPE;

    const randomId = Math.random().toString(36).substring(2, 10);

    let content: REQUEST_LOG_CONTENT_TYPE;

    if (contextType === CONTEXT.GRAPHQL) {
      const host = context.getArgs()[2].req.headers.host;
      const ctx = GqlExecutionContext.create(context);

      const { input } = ctx.getArgs();
      const { fieldName } = ctx.getInfo();
      content = {
        host,
        randomId,
        type: contextType,
        content: {
          fieldName,
          input,
        },
      };

      // applyRequestId(ctx, randomId);
    } else if (contextType === CONTEXT.HTTP) {
      const ctx = context.switchToHttp();
      const host = ctx.getRequest().headers.host;
      content = {
        host,
        randomId,
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
          console.log('output');
          console.log(setOutputLog(val));
        },
        error: (val: unknown) => {
          console.log(val);
        },
      }),
    );
  }
}
