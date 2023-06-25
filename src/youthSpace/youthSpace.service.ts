import { randomInt } from 'crypto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { YouthAPIService } from '@/api/youthAPI.service';
import { UserDetail } from '@/entities/userDetail.entity';
import { convertWorknetToYouthCode } from '@/lib/constants/youthConstant';
import { setting } from '@/setting';

import { SpaceDetailSearchDto } from './dto/SpaceDetailSearchDto';
import { SpaceResultDto } from './dto/SpaceResultDto';

@Injectable()
export class YouthSpaceService {
  constructor(
    private readonly youthAPI: YouthAPIService,
    @InjectRepository(UserDetail) private userDetailRepository: Repository<UserDetail>,
  ) {
    this.userDetailRepository = userDetailRepository;
  }
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
  async recommend(userUUID: string): Promise<SpaceResultDto[]> {
    const userDetail = await this.userDetailRepository.findOne({ where: { userUUID: userUUID } });
    let result: SpaceResultDto[];
    let count = 5;
    do {
      result = await this.youthAPI.querySpaceAPI({
        openApiVlak: setting.youthAPI.apiKey,
        display: 4,
        pageIndex: randomInt(1, count--),
        pageType: 1,
        srchAreaSggn: convertWorknetToYouthCode(userDetail.localCode),
      });
    } while (result.length < 4 && count > 1);
    return result;
  }
}
