import { Injectable } from '@nestjs/common';

import { YouthAPIService } from '@/api/youthAPI.service';
import { setting } from '@/setting';

import { SpaceDetailSearchDto } from './dto/SpaceDetailSearchDto';
import { SpaceResultDto } from './dto/SpaceResultDto';

@Injectable()
export class YouthSpaceService {
  constructor(private readonly youthAPI: YouthAPIService) {}
  async generalSearch(searchKeyword: string, pageIndex: number): Promise<SpaceResultDto[]> {
    const result = await this.youthAPI.querySpaceAPI({
      openApiVlak: setting.youthAPI.apiKey,
      display: 10,
      pageIndex: pageIndex,
      pageType: 1,
      srchSpnm: searchKeyword,
    });
    return result;
  }
  async detailSearch(detailSearchData: SpaceDetailSearchDto): Promise<SpaceResultDto[]> {
    const result = await this.youthAPI.querySpaceAPI({
      openApiVlak: setting.youthAPI.apiKey,
      display: 10,
      pageIndex: detailSearchData.pageIndex,
      pageType: 1,
      srchSpnm: detailSearchData.searchKeyword,
      srchAreaCpvn: detailSearchData.spaceStateCode,
      srchAreaSggn: detailSearchData.spaceCityCode,
    });
    return result;
  }
  async IDsearch(spaceID: string): Promise<SpaceResultDto[]> {
    const result = await this.youthAPI.querySpaceAPI({
      openApiVlak: setting.youthAPI.apiKey,
      display: 1,
      pageIndex: 1,
      pageType: 2,
      srchSpcId: spaceID,
    });
    return result;
  }
}
