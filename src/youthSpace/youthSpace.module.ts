import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { YouthAPIService } from '@/api/youthAPI.service';
import { UserDetail } from '@/entities/userDetail.entity';
import { BuildinAuthMiddleware } from '@/middleware/buildin-auth/buildin-auth.middleware';

import { YouthSpaceController } from './youthSpace.controller';
import { YouthSpaceService } from './youthSpace.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetail])],
  controllers: [YouthSpaceController],
  providers: [YouthSpaceService, YouthAPIService],
})
export class YouthSpaceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BuildinAuthMiddleware).forRoutes('youthspace');
  }
}
