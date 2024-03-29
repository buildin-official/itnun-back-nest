import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { PolicyDetailSearchDto, PolicyIDSearchDto } from './dto/PolicyDetailSearchDto';
import { YouthPolicyService } from './youthPolicy.service';

@Controller('youthpolicy')
export class YouthPolicyController {
  constructor(private readonly youthPolicy: YouthPolicyService) {}

  @Get('/search')
  async policyGeneralSearch(
    @Query('searchKeyword') searchKeyword: string,
    @Query('pageIndex') pageIndex: number,
  ): Promise<string> {
    if (searchKeyword == null) {
      return 'Search Keyword is Null!';
    }
    const result = await this.youthPolicy.generalSearch(searchKeyword, pageIndex);
    return Object.assign(instanceToPlain(result));
  }
  @Post('/search')
  async policyDetailSearch(@Body() detailSearchData: PolicyDetailSearchDto): Promise<string> {
    const result = await this.youthPolicy.detailSearch(detailSearchData);
    return Object.assign(instanceToPlain(result));
  }
  @Post('/idsearch')
  async policyIDsearch(@Body() policy: PolicyIDSearchDto): Promise<string> {
    const result = await this.youthPolicy.IDsearch(policy.policyID);
    return Object.assign(instanceToPlain(result));
  }
  @Get('/recommend')
  async policyRecommend(): Promise<string> {
    const result = await this.youthPolicy.recommend();
    return Object.assign(instanceToPlain(result));
  }
}
