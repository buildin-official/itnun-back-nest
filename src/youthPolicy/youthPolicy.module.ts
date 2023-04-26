import { MiddlewareConsumer, Module } from '@nestjs/common';

import { YouthPolicyAPIService } from '../lib/youthPolicyAPI.service';
import { BuildinAuthMiddleware } from '../middleware/buildin-auth/buildin-auth.middleware';

import { YouthPolicyController } from './youthPolicy.controller';
import { YouthPolicyService } from './youthPolicy.service';

@Module({
  imports: [],
  controllers: [YouthPolicyController],
  providers: [YouthPolicyService, YouthPolicyAPIService],
})
export class YouthPolicyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BuildinAuthMiddleware).forRoutes('youthpolicy');
  }
}
