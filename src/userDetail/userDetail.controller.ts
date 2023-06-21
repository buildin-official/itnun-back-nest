import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request } from 'express';

import { UserDetailUpdateReqDto } from './dto/UserDetailUpdateDto';
import { UserDetailService } from './userDetail.service';

@Controller('userdetail')
export class UserDetailController {
  constructor(private readonly userDetail: UserDetailService) {}

  @Get('/')
  async getUserDetail(@Req() req: Request): Promise<string> {
    const result = await this.userDetail.findOne(req.userId);
    if (result == null) {
      return 'UserDetail Not Found!';
    }
    return Object.assign(instanceToPlain(result));
  }
  @Post('/')
  async postUserDetail(@Req() req: Request, @Body() userDetail: UserDetailUpdateReqDto): Promise<string> {
    await this.userDetail.updateUserDetail(req.userId, userDetail);
    return 'Update UserDetail Success!';
  }
}
