import { Injectable } from '@nestjs/common';

import { YouthPolicyAPIService } from '@/api/youthPolicyAPI.service';
import { setting } from '@/setting';

import { PolicyDetailSearchDto } from './dto/PolicyDetailSearchDto';
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
  async detailSearch(detailSearchData: PolicyDetailSearchDto): Promise<PolicyResultDto[]> {
    const result = await this.youthAPI.queryAPI({
      openApiVlak: setting.youthPolicyAPI.apiKey,
      display: 10,
      pageIndex: detailSearchData.pageIndex,
      query: detailSearchData.searchKeyword,
      bizTycdSel: detailSearchData.policyTypeCode,
      srchPolyBizSecd: detailSearchData.policyLocationCode,
    });
    return result;
  }
}
