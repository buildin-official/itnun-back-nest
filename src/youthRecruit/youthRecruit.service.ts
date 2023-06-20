import { Injectable } from '@nestjs/common';

import { RecruitInfoAPIService } from '@/api/recruitInfoAPI.service';
import { setting } from '@/setting';

import { RecruitDetailSearchDto } from './dto/RecruitDetailSearchDto';
import { RecruitResultDto } from './dto/RecruitResultDto';

@Injectable()
export class YouthRecruitService {
  constructor(private readonly recruitAPI: RecruitInfoAPIService) {}
  async generalSearch(searchKeyword: string, pageIndex: number): Promise<RecruitResultDto[]> {
    const result = this.recruitAPI.queryWithPagination(setting.worknetAPI.apiKey, 10, pageIndex, {});
    return result;
  }
  async detailSearch(detailSearchData: RecruitDetailSearchDto): Promise<RecruitResultDto[]> {
    const result = this.recruitAPI.queryWithPagination(setting.worknetAPI.apiKey, 10, detailSearchData.pageIndex, {});
    return result;
  }
}
