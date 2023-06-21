import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { GeoCodingModule } from './geoCoding/geoCoding.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { setting } from './setting';
import { UserDetailModule } from './userDetail/userDetail.module';
import { YouthNewsModule } from './youthNews/youthNews.module';
import { YouthPolicyModule } from './youthPolicy/youthPolicy.module';
import { YouthRecruitModule } from './youthRecruit/youthRecruit.module';
import { YouthSpaceModule } from './youthSpace/youthSpace.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //Database 설정
      host: setting.db.host,
      port: setting.db.port,
      username: setting.db.user,
      password: setting.db.password,
      database: setting.db.database,
      entities: ['dist/**/*.entity.{ts,js}'], // Entity 연결
      synchronize: true,
    }),
    UserDetailModule,
    YouthPolicyModule,
    YouthSpaceModule,
    YouthNewsModule,
    YouthRecruitModule,
    GeoCodingModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
