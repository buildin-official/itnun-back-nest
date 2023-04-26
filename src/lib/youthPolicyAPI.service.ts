import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';
import { stringify } from 'qs';

import { setting } from '../setting';
import { PolicyResultDto } from '../youthPolicy/dto/PolicyResultDto';

@Injectable()
export class YouthPolicyAPIService {
  async queryAPI(params: {
    openApiVlak: string;
    display: number;
    pageIndex: number;
    query: string;
    bizTycdSel?: string[];
    srchPolyBizSecd?: string[];
  }): Promise<PolicyResultDto[]> {
    const result: PolicyResultDto[] = [];
    const apiResponse = axios.get(setting.youthPolicyAPI.host, {
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
}
