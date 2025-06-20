// 4:25:18 - создание Guard

import {
  type ExecutionContext,
  Injectable,
  type CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('2 - Срабатывание Guard');
    const request = context.switchToHttp().getRequest() as Request;

    const token = request.headers['authorization'];

    // в реальности надо расшифровать токен и извлечь из него Id и сопоставить с пользователем в базе

    if (!token || !token.startsWith('Bearer')) {
      throw new UnauthorizedException('Вы не авторизованы');
    }

    return true;
  }
}
