import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // пример применения guard глобально:
  // app.useGlobalGuards(new AuthGuard());

  // пример применения interceptor глобально:
  app.useGlobalInterceptors(new ResponseInterceptor());

  // пример применения ExceptionFiler глобально:
  app.useGlobalFilters(new AllExceptionsFilter());

  // подключение Swagger:
  // https://youtu.be/HT6cm4GoSIw?t=17287

  const config = new DocumentBuilder()
    .setTitle('NestJS-course API')
    .setDescription('API documentation for NextJS-course')
    .setVersion('1.0.0')
    .setContact('Lola', 'https://lola.com', 'support@lola.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);

  // теперь можно в браузере перейти на адрес http://localhost:3000/swagger и увидеть документацию

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
