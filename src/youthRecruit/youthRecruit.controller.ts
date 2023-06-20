import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { RecruitDetailSearchDto } from './dto/RecruitDetailSearchDto';
import { YouthRecruitService } from './youthRecruit.service';

@Controller('youthrecruit')
export class YouthRecruitController {
  constructor(private readonly youthRecruit: YouthRecruitService) {}

  @Get('/search')
  async recruitGeneralSearch(
    @Query('searchKeywords') searchKeywords: string,
    @Query('pageIndex') pageIndex: number,
  ): Promise<string> {
    if (searchKeywords == null) {
      return 'searchKeywords is Null!';
    }
    if (pageIndex == null) {
      return 'pageIndex is Null!';
    }
    const listedSearchKeywords = searchKeywords.split(',');
    const result = await this.youthRecruit.generalSearch(listedSearchKeywords, pageIndex);
    return Object.assign(instanceToPlain(result));
  }
  @Post('/search')
  async recruitDetailSearch(@Body() detailSearchData: RecruitDetailSearchDto): Promise<string> {
    const result = await this.youthRecruit.detailSearch(detailSearchData);
    return Object.assign(instanceToPlain(result));
  }
}