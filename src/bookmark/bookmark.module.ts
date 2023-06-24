import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoodShopBookmark, SpaceBookmark, PolicyBookmark, RecuritBookmark } from '@/entities/bookmark.entity';
import { BuildinAuthMiddleware } from '@/middleware/buildin-auth/buildin-auth.middleware';

import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [TypeOrmModule.forFeature([PolicyBookmark, SpaceBookmark, RecuritBookmark, GoodShopBookmark])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BuildinAuthMiddleware).forRoutes('bookmark');
  }
}
