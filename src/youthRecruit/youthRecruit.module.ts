import { MiddlewareConsumer, Module } from '@nestjs/common';

import { RecruitInfoAPIService } from '@/api/recruitInfoAPI.service';
import { BuildinAuthMiddleware } from '@/middleware/buildin-auth/buildin-auth.middleware';

import { YouthRecruitController } from './youthRecruit.controller';
import { YouthRecruitService } from './youthRecruit.service';

@Module({
  imports: [],
  controllers: [YouthRecruitController],
  providers: [YouthRecruitService, RecruitInfoAPIService],
})
export class YouthRecruitModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BuildinAuthMiddleware).forRoutes('youthrecruit');
  }
}
