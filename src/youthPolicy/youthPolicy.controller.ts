import { Controller, Get, Query } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

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
    if (result == null) {
      return 'UserDetail Not Found!';
    }
    return Object.assign(instanceToPlain(result));
  }
}
