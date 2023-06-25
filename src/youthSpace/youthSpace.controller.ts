import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request } from 'express';

import { SpaceDetailSearchDto, SpaceIDSearchDto } from './dto/SpaceDetailSearchDto';
import { YouthSpaceService } from './youthSpace.service';

@Controller('youthspace')
export class YouthSpaceController {
  constructor(private readonly youthSpace: YouthSpaceService) {}
  @Get('/search')
  async policyGeneralSearch(
    @Query('searchKeyword') searchKeyword: string,
    @Query('pageIndex') pageIndex: number,
  ): Promise<string> {
    if (searchKeyword == null) {
      return 'Search Keyword is Null!';
    }
    const result = await this.youthSpace.generalSearch(searchKeyword, pageIndex);
    return Object.assign(instanceToPlain(result));
  }
  @Post('/search')
  async policyDetailSearch(@Body() detailSearchData: SpaceDetailSearchDto): Promise<string> {
    const result = await this.youthSpace.detailSearch(detailSearchData);
    return Object.assign(instanceToPlain(result));
  }
  @Post('/idsearch')
  async policyIDsearch(@Body() space: SpaceIDSearchDto): Promise<string> {
    const result = await this.youthSpace.IDsearch(space.spaceID);
    return Object.assign(instanceToPlain(result));
  }
  @Get('/recommend')
  async policyRecommend(@Req() req: Request): Promise<string> {
    const result = await this.youthSpace.recommend(req.userId);
    return Object.assign(instanceToPlain(result));
  }
}
