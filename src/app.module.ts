import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
import { ActorModule } from './actor/actor.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MovieModule,
    ReviewModule,
    ActorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

// forRoutes - указывает на каких маршрутах будет срабатывать мидлвар ('*' - на всех маршрутах)
// если в forRoutes(AppController) добавить, то он будет обрабатывать все роуты,которые находятся в AppController
// forRoutes({path: '/movies', method: RequestMethod.POST})   // import { RequestMethod } from '@nestjs/common';
// exclude - указывает на каких маршрутах НЕ будет срабатывать мидлвар
