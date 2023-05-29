import { MiddlewareConsumer, Module } from '@nestjs/common';

import { YouthAPIService } from '@/api/youthAPI.service';
import { BuildinAuthMiddleware } from '@/middleware/buildin-auth/buildin-auth.middleware';

import { YouthSpaceController } from './youthSpace.controller';
import { YouthSpaceService } from './youthSpace.service';

@Module({
  imports: [],
  controllers: [YouthSpaceController],
  providers: [YouthSpaceService, YouthAPIService],
})
export class YouthSpaceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BuildinAuthMiddleware).forRoutes('youthspace');
  }
}
