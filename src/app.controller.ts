import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorator';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('API-Custome-name') // Если нужно задать кастомное имя для Swagger
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  // пример использования Pipe:
  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie: ${title}`;
  }

  // пример использования Guard:
  // + пример локального использования кастомного декоратора UserAgent
  // + пример локального использования Interceptor
  // + пример локального использования ExceptionFilter
  @UsePipes(StringToLowercasePipe)
  @UseGuards(AuthGuard)
  // @UseInterceptors(ResponseInterceptor) // локальное использование
  // @UseFilters(AllExceptionsFilter)
  @Get('@me')
  getProfile(@UserAgent() userAgent: string) {
    console.log('5 - Срабатывание контроллера getProfile: GET: /api/@me');
    return {
      id: 1,
      name: 'Lola',
      email: 'lola@mail.com',
      userAgent,
    };
  }
}
