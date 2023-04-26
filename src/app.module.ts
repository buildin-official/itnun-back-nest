import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { setting } from './setting';
import { UserDetailModule } from './userDetail/userDetail.module';
import { YouthPolicyModule } from './youthPolicy/youthPolicy.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
