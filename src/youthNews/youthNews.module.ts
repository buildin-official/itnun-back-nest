import { MiddlewareConsumer, Module } from '@nestjs/common';

import { BuildinAuthMiddleware } from '@/middleware/buildin-auth/buildin-auth.middleware';

import { YouthNewsController } from './youthNews.controller';
import { YouthNewsService } from './youthNews.service';

@Module({
  imports: [],
  controllers: [YouthNewsController],
  providers: [YouthNewsService],
})
export class YouthNewsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BuildinAuthMiddleware).forRoutes('youthnews');
  }
}
