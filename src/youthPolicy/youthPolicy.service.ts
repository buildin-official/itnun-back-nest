import { Injectable } from '@nestjs/common';

import { YouthPolicyAPIService } from '../lib/youthPolicyAPI.service';
import { setting } from '../setting';

import { PolicyResultDto } from './dto/PolicyResultDto';

@Injectable()
export class YouthPolicyService {
  constructor(private readonly youthAPI: YouthPolicyAPIService) {}
  async generalSearch(searchKeyword: string, pageIndex: number): Promise<PolicyResultDto[]> {
    const result = await this.youthAPI.queryAPI({
      openApiVlak: setting.youthPolicyAPI.apiKey,
      display: 10,
      pageIndex: pageIndex,
      query: searchKeyword,
    });
    return result;
  }
}
