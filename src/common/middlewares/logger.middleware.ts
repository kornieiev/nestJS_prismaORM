import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

// 4:12:30 - создание Middleware
// 4:16:36 - подключение Middleware (глобально / локально)
// 4:19:14 - подключение Middleware в main.ts

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `1 - Срабатывание LoggingMiddleware: Request... ${req.method} ${req.path}`,
    );
    console.log(``);
    next(); // функция, которая передает управление либо следующему middleware, либо маршруту
  }
}
