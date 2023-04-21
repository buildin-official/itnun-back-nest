import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDetail } from '../entities/userDetail.entity';

import { UserDetailController } from './userDetail.controller';
import { UserDetailService } from './userDetail.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetail])],
  controllers: [UserDetailController],
  providers: [UserDetailService],
})
export class UserDetailModule {}
