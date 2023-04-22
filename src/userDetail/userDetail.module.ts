import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDetail } from '../entities/userDetail.entity';
import { BuildinAuthMiddleware } from '../middleware/buildin-auth/buildin-auth.middleware';

import { UserDetailController } from './userDetail.controller';
import { UserDetailService } from './userDetail.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetail])],
  controllers: [UserDetailController],
  providers: [UserDetailService],
})
export class UserDetailModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BuildinAuthMiddleware).forRoutes('userdetail');
  }
}
