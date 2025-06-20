// 4:31:36
// https://youtu.be/HT6cm4GoSIw?t=16297

import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const UserAgent = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;

    return request.headers['user-agent'];
  },
);
