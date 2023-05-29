import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';
import { stringify } from 'qs';

import { setting } from '@/setting';
import { PolicyResultDto } from '@/youthPolicy/dto/PolicyResultDto';
import { SpaceResultDto } from '@/youthSpace/dto/SpaceResultDto';

// API Docs URL: https://www.youthcenter.go.kr/opi/openApiIntro.do

@Injectable()
export class YouthAPIService {
  async queryPolicyAPI(params: {
    openApiVlak: string;
    display: number;
    pageIndex: number;
    query?: string;
    bizTycdSel?: string[];
    srchPolyBizSecd?: string[];
  }): Promise<PolicyResultDto[]> {
    const result: PolicyResultDto[] = [];
    const apiResponse = axios.get(setting.youthAPI.host + setting.youthAPI.policyURI, {
      params: params,
      responseType: 'text',
      paramsSerializer: (params) => {
        return stringify(params, { arrayFormat: 'comma' });
      },
    });

    const $ = load((await apiResponse).data, {
      xml: true,
    });

    // parse xml response.data
    const policyList = $('emp');

    for await (const policy of policyList) {
      result.push({
        policyId: $(policy).find('bizId').text(),
        policyBizLocation: $(policy).find('polyBizSecd').text(),
        policyBizType: $(policy).find('polyBizTy').text(),
        policyName: $(policy).find('polyBizSjnm').text(),
        policyIntroduce: $(policy).find('polyItcnCn').text(),
        policyType: $(policy).find('plcyTpNm').text(),
        policySupportAmount: $(policy).find('sporScvl').text(),
        policySupportIntroduce: $(policy).find('sporCn').text(),
        policyRequireAge: $(policy).find('ageInfo').text(),
        policyRequireEmployStatus: $(policy).find('empmSttsCn').text(),
        policyRequireEducation: $(policy).find('accrRqisCn').text(),
        policyRequireMajor: $(policy).find('majrRqisCn').text(),
        policyRequireSpecializationField: $(policy).find('splzRlmRqisCn').text(),
        policySubmitBizName: $(policy).find('cnsgNmor').text(),
        policySubmitPeriod: $(policy).find('rqutPrdCn').text(),
        policySubmitStep: $(policy).find('rqutProcCn').text(),
        policySubmitJudgementAnnounce: $(policy).find('jdgnPresCn').text(),
        policySubmitURL: $(policy).find('rqutUrla').text(),
      });
    }
    return result;
  }
  async querySpaceAPI(params: {
    openApiVlak: string;
    display: number;
    pageIndex: number;
    srchSpnm?: string;
    srchAreaCpvn?: string;
    srchAreaSggn?: string;
  }): Promise<SpaceResultDto[]> {
    const result: SpaceResultDto[] = [];
    const apiResponse = axios.get(setting.youthAPI.host + setting.youthAPI.spaceURI, {
      params: params,
      responseType: 'text',
      paramsSerializer: (params) => {
        return stringify(params, { arrayFormat: 'comma' });
      },
    });

    const $ = load((await apiResponse).data, {
      xml: true,
    });

    // parse xml response.data
    const spaceList = $('space');

    for await (const space of spaceList) {
      result.push({
        spaceId: $(space).find('spcId').text(),
        spaceName: $(space).find('spcName').text(),
        spaceState: $(space).find('areaCpvn').text(),
        spaceCity: $(space).find('areaSggn').text(),
        spaceAddress: $(space).find('address').text(),
        spaceRunningTime: $(space).find('spcTime').text(),
        spaceOrgainzation: $(space).find('operOrgan').text(),
        spaceURL: $(space).find('homepage').text(),
        spacePhoneNo: $(space).find('telNo').text(),
        spaceTarget: $(space).find('applyTarget').text(),
        spaceType: $(space).find('spcType').text(),
        spaceForm: $(space).find('majorForm').text(),
        spaceCost: $(space).find('spcCost').text(),
        spaceFacilityCost: $(space).find('addFacilCost').text(),
        spaceFoodOffer: $(space).find('foodYn').text(),
      });
    }
    return result;
  }
}
