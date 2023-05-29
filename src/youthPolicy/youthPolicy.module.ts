import { MiddlewareConsumer, Module } from '@nestjs/common';

import { YouthAPIService } from '@/api/youthAPI.service';
import { BuildinAuthMiddleware } from '@/middleware/buildin-auth/buildin-auth.middleware';

import { YouthPolicyController } from './youthPolicy.controller';
import { YouthPolicyService } from './youthPolicy.service';

@Module({
  imports: [],
  controllers: [YouthPolicyController],
  providers: [YouthPolicyService, YouthAPIService],
})
export class YouthPolicyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BuildinAuthMiddleware).forRoutes('youthpolicy');
  }
}
