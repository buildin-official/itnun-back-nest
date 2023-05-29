import { Injectable } from '@nestjs/common';

import { YouthAPIService } from '@/api/youthAPI.service';
import { setting } from '@/setting';

import { PolicyDetailSearchDto } from './dto/PolicyDetailSearchDto';
import { PolicyResultDto } from './dto/PolicyResultDto';

@Injectable()
export class YouthPolicyService {
  constructor(private readonly youthAPI: YouthAPIService) {}
  async generalSearch(searchKeyword: string, pageIndex: number): Promise<PolicyResultDto[]> {
    const result = await this.youthAPI.queryPolicyAPI({
      openApiVlak: setting.youthAPI.apiKey,
      display: 10,
      pageIndex: pageIndex,
      query: searchKeyword,
    });
    return result;
  }
  async detailSearch(detailSearchData: PolicyDetailSearchDto): Promise<PolicyResultDto[]> {
    const result = await this.youthAPI.queryPolicyAPI({
      openApiVlak: setting.youthAPI.apiKey,
      display: 10,
      pageIndex: detailSearchData.pageIndex,
      query: detailSearchData.searchKeyword,
      bizTycdSel: detailSearchData.policyTypeCode,
      srchPolyBizSecd: detailSearchData.policyLocationCode,
    });
    return result;
  }
}
