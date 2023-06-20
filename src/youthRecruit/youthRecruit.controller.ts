import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { RecruitDetailSearchDto } from './dto/RecruitDetailSearchDto';
import { YouthRecruitService } from './youthRecruit.service';

@Controller('youthrecruit')
export class YouthRecruitController {
  constructor(private readonly youthRecruit: YouthRecruitService) {}

  @Get('/search')
  async recruitGeneralSearch(
    @Query('searchKeyword') searchKeyword: string,
    @Query('pageIndex') pageIndex: number,
  ): Promise<string> {
    if (searchKeyword == null) {
      return 'Search Keyword is Null!';
    }
    const result = await this.youthRecruit.generalSearch(searchKeyword, pageIndex);
    return Object.assign(instanceToPlain(result));
  }
  @Post('/search')
  async recruitDetailSearch(@Body() detailSearchData: RecruitDetailSearchDto): Promise<string> {
    const result = {};
    return Object.assign(instanceToPlain(result));
  }
}
