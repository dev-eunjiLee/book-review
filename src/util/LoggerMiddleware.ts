import { Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

// https://taptorestart.tistory.com/entry/Q-%EB%84%A4%EC%8A%A4%ED%8A%B8NestJS%EC%97%90%EC%84%9C-HTTP-%EC%9A%94%EC%B2%AD-%EC%8B%9C-%EB%A1%9C%EA%B7%B8-%EC%B0%8D%EB%8A%94-%EB%B0%A9%EB%B2%95%EC%9D%80
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: (error?: any) => void): any {
    const { ip, method, originalUrl, body } = req;
    const userAgent = req.get('user-agent');
    this.logger.log(
      `${ip} - ${method} - ${originalUrl} - ${userAgent} - ${JSON.stringify(
        body,
      )}`,
    );
    next();
  }
}
