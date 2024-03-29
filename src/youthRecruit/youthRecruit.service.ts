import { randomInt } from 'crypto';

import { Injectable } from '@nestjs/common';

import { RecruitInfoAPIService } from '@/api/recruitInfoAPI.service';
import { setting } from '@/setting';

import { RecruitDetailSearchDto } from './dto/RecruitDetailSearchDto';
import { RecruitDetailDto, RecruitResultDto } from './dto/RecruitResultDto';

@Injectable()
export class YouthRecruitService {
  constructor(private readonly recruitAPI: RecruitInfoAPIService) {}
  async generalSearch(searchKeywords: string[], pageIndex: number): Promise<RecruitResultDto[]> {
    const result = this.recruitAPI.queryWithPagination(setting.worknetAPI.apiKey, 10, pageIndex, {
      keyword: searchKeywords,
    });
    return result;
  }
  async detailSearch(detailSearchData: RecruitDetailSearchDto): Promise<RecruitResultDto[]> {
    console.log(detailSearchData.payType);
    const result = this.recruitAPI.queryWithPagination(setting.worknetAPI.apiKey, 10, detailSearchData.pageIndex, {
      keyword: detailSearchData.searchKeywords,
      salTp: detailSearchData.payType,
      minPay: detailSearchData.minPay,
      maxPay: detailSearchData.maxPay,
      region: detailSearchData.region,
      career: detailSearchData.career,
      minCareerMonth: detailSearchData.minCareerMonth,
      maxCareerMonth: detailSearchData.maxCareerMonth,
      education: detailSearchData.education,
      major: detailSearchData.major,
      holidayTp: detailSearchData.workType,
      welfare: detailSearchData.workConv,
      comPreferential: detailSearchData.computerSkill,
      pfPreferential: detailSearchData.preferential,
    });
    return result;
  }
  async IDsearch(recruitID: string): Promise<RecruitDetailDto> {
    const result = this.recruitAPI.queryDetail(setting.worknetAPI.apiKey, recruitID);
    return result;
  }
  async recommend(userID: string): Promise<RecruitResultDto[]> {
    const result = this.recruitAPI.queryWithPagination(setting.worknetAPI.apiKey, 4, randomInt(1, 40), {});
    return result;
  }
}
