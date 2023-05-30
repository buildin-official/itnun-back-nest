import { MiddlewareConsumer, Module } from '@nestjs/common';

import { GeoCodingAPIService } from '@/api/geoCodingAPI.service';
import { BuildinAuthMiddleware } from '@/middleware/buildin-auth/buildin-auth.middleware';

import { GeoCodingController } from './geoCoding.controller';
import { GeoCodingService } from './geoCoding.service';

@Module({
  imports: [],
  controllers: [GeoCodingController],
  providers: [GeoCodingService, GeoCodingAPIService],
})
export class GeoCodingModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BuildinAuthMiddleware).forRoutes('geoCoding');
  }
}
