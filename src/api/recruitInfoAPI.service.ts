import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { load } from 'cheerio';

import { setting } from '@/setting';

export interface RecruitInfoSearchResponse {
  wantedAuthNo: string;
  companyName: string;
  businessNo: string;
  recruitTitle: string;
  salaryType: string;
  salary: string;
  minSalary: string;
  maxSalary: string;
  region: string;
  holidayType: string;
  minEducation: string;
  maxEducation: string;
  career: string;
  registerDate: string;
  closeDate: string;
  infoSvc: string;
  infoUrl: string;
  mobileInfoUrl: string;
  zipCode: string;
  streetNameCode: string;
  basicAddress: string;
  detailAddress: string;
  employmentType: number;
  jobsCode: number;
  modifyDate: number;
  prefCode: string;
}

function paramMaker(params: Record<string, unknown>) {
  const result: string[] = [];

  for (const key of Object.keys(params)) {
    const value = params[key];
    result.push(`${key}=${value instanceof Array ? value.join('|') : String(value)}`);
  }

  return result.join('&');
}

@Injectable()
export class RecruitInfoAPIService {
  private _apiClient: AxiosInstance;

  constructor() {
    this._apiClient = axios.create({
      baseURL: setting.worknetAPI.host,
    });
  }

  public async queryWithPagination(
    authKey: string,
    count: number,
    page: number,
    params?: {
      region?: Array<string>;
      occupation?: Array<string>;
      salTp?: 'D' | 'H' | 'M' | 'Y';
      minPay?: number;
      maxPay?: number;
      education?: Array<string>;
      career?: 'N' | 'E' | 'Z';
      minCareerMonth?: number;
      maxCareerMonth?: number;
      pref?: Array<'Y' | 'D'>;
      subway?: Array<string>;
      empTp?: Array<'4' | '10' | '11' | '20' | '21' | 'Y'>;
      termContractMmcnt?: Array<'1' | '3' | '6' | '12'>;
      holidayTp?: Array<'1' | '2' | '3' | '9'>;
      busino?: string;
      isDtlSmlgnt?: boolean;
      isWorkStudyJoin?: boolean;
      smlgntCoClcd?: string;
      workerCnt?: 'W5' | 'W9' | 'W10' | 'W30' | 'W50' | 'W100';
      welfare?: Array<'01' | '02' | '04' | '11' | '12' | '13' | '06' | '09'>;
      certLic?: Array<string>;
      regDate?: 'D-0' | 'D-3' | 'M-1' | 'W-1' | 'W-2';
      keyword?: Array<string>;
      empTpGb?: '1' | '2';
      sortOrderBy?: 'DESC' | 'ASC';
      major?: Array<string>;
      foreignLanguage?: Array<string>;
      comPreferential?: Array<'1' | '2' | '4' | '6' | '9'>;
      pfPreferential?: Array<'05' | '07' | '08' | '09' | '10' | '14' | 'S' | 'B'>;
      workHrCd?: Array<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '99'>;
    },
  ) {
    const response = await this._apiClient.get(
      `/opi/opi/opia/wantedApi.do?${paramMaker({
        authKey,
        callTp: 'L',
        returnType: 'xml',
        startPage: count * (page - 1) + 1,
        display: count,
        coTp: '09',
        ...params,
      })}`,
    );

    const $ = load((await response).data, {
      xml: true,
    });

    const wantedList = $('wantedRoot').find('wanted');

    const result: RecruitInfoSearchResponse[] = [];

    for (const wanted of wantedList) {
      result.push({
        wantedAuthNo: $(wanted).find('wantedAuthNo').text(),
        companyName: $(wanted).find('company').text(),
        businessNo: $(wanted).find('busino').text(),
        recruitTitle: $(wanted).find('title').text(),
        salaryType: $(wanted).find('salTpNm').text(),
        salary: $(wanted).find('sal').text(),
        minSalary: $(wanted).find('minSal').text(),
        maxSalary: $(wanted).find('maxSal').text(),
        region: $(wanted).find('region').text(),
        holidayType: $(wanted).find('holidayTpNm').text(),
        minEducation: $(wanted).find('minEdubg').text(),
        maxEducation: $(wanted).find('maxEdubg').text(),
        career: $(wanted).find('career').text(),
        registerDate: $(wanted).find('maxEdubg').text(),
        closeDate: $(wanted).find('closeDt').text(),
        infoSvc: $(wanted).find('infoSvc').text(),
        infoUrl: $(wanted).find('wantedInfoUrl').text(),
        mobileInfoUrl: $(wanted).find('wantedMobileInfoUrl').text(),
        zipCode: $(wanted).find('zipCd').text(),
        streetNameCode: $(wanted).find('strtnmCd').text(),
        basicAddress: $(wanted).find('basicAddr').text(),
        detailAddress: $(wanted).find('detailAddr').text(),
        employmentType: Number($(wanted).find('empTpCd').text()),
        jobsCode: Number($(wanted).find('jobsCd').text()),
        modifyDate: Number($(wanted).find('smodifyDtm').text()),
        prefCode: $(wanted).find('prefCd').text(),
      });
    }

    return result;
  }
}