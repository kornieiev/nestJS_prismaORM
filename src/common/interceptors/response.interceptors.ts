// 4:36:54 - Создание Interceptor
// https://youtu.be/HT6cm4GoSIw?t=16613

import {
  Injectable,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log('3 - Срабатывание ResponseInterceptor');
    return next.handle().pipe(
      map((data) => {
        // console.log('data in ResponseInterceptor', data);
        return {
          status: 'OK',
          data,
        };
      }),
    );
  }
}
