import { Body, Controller, Get, Post } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { UserDetailUpdateReqDto } from './dto/UserDetailUpdateReqDto';
import { UserDetailService } from './userDetail.service';

@Controller('userdetail')
export class UserDetailController {
  constructor(private readonly userDetail: UserDetailService) {}

  @Get('/')
  async getHello(): Promise<string> {
    const result = await this.userDetail.findOne('1234-1234-124');
    return Object.assign(instanceToPlain(result));
  }
  @Post('/')
  async postHello(@Body() userDetail: UserDetailUpdateReqDto): Promise<string> {
    await this.userDetail.updateUserDetail('1234-1234-124', userDetail);
    return 'Update UserDetail Success!';
  }
}
