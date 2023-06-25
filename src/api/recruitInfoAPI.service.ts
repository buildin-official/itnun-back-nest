import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { load } from 'cheerio';

import { setting } from '@/setting';
import { RecruitResultDto } from '@/youthRecruit/dto/RecruitResultDto';

function paramMaker(params: Record<string, unknown>) {
  const result: string[] = [];

  for (const key of Object.keys(params)) {
    const value = params[key];
    if (value === undefined) continue;
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
      education?: string;
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
      major?: string;
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
        startPage: page,
        display: count,
        coTp: '09',
        ...params,
      })}`,
    );

    const $ = load((await response).data, {
      xml: true,
    });

    const wantedList = $('wantedRoot').find('wanted');

    const result: RecruitResultDto[] = [];

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

  public async queryDetail(authKey: string, wantedAuthNo: string) {
    const response = await this._apiClient.get(
      `/opi/opi/opia/wantedApi.do?${paramMaker({
        authKey,
        wantedAuthNo,
        callTp: 'L',
        returnType: 'xml',
        infoSvc: 'VALIDATION',
      })}`,
    );

    console.log(response);

    const $ = load((await response).data, {
      xml: true,
    });

    const wantedData = $('wantedDtl');
    const corpInfo = wantedData.find('corpInfo');
    const wantedInfo = wantedData.find('wantedInfo');
    const empchargeInfo = wantedData.find('empchargeInfo');

    return {
      wantedAuthNo: wantedData.find('wantedAuthNo').text(),
      corpInfo: {
        corpNm: corpInfo.find('corpNm').text(),
        reperNm: corpInfo.find('reperNm').text(),
        totPsncnt: Number(corpInfo.find('totPsncnt').text()),
        capitalAmt: Number(corpInfo.find('capitalAmt').text()),
        yrSalesAmt: Number(corpInfo.find('yrSalesAmt').text()),
        indTpCdNm: corpInfo.find('indTpCdNm').text(),
        busiCont: corpInfo.find('busiCont').text(),
        corpAddr: corpInfo.find('corpAddr').text(),
        homePg: corpInfo.find('homePg').text(),
        busiSize: corpInfo.find('busiSize').text(),
      },
      wantedInfo: {
        jobsNm: wantedInfo.find('jobsNm').text(),
        wantedTitle: wantedInfo.find('wantedTitle').text(),
        relJobsNm: wantedInfo.find('relJobsNm').text(),
        jobCont: wantedInfo.find('jobCont').text(),
        receiptCloseDt: wantedInfo.find('receiptCloseDt').text(),
        empTpNm: wantedInfo.find('empTpNm').text(),
        collectPsncnt: wantedInfo.find('collectPsncnt').text(),
        salTpNm: wantedInfo.find('salTpNm').text(),
        enterTpNm: wantedInfo.find('enterTpNm').text(),
        eduNm: wantedInfo.find('eduNm').text(),
        forLang: wantedInfo.find('forLang').text(),
        major: wantedInfo.find('major').text(),
        certificate: wantedInfo.find('certificate').text(),
        mltsvcExcHope: wantedInfo.find('mltsvcExcHope').text(),
        compAbl: wantedInfo.find('compAbl').text(),
        pfCond: wantedInfo.find('pfCond').text(),
        etcPfCond: wantedInfo.find('etcPfCond').text(),
        selMthd: wantedInfo.find('selMthd').text(),
        rcptMthd: wantedInfo.find('rcptMthd').text(),
        submitDoc: wantedInfo.find('submitDoc').text(),
        etcHopeCont: wantedInfo.find('etcHopeCont').text(),
        workRegion: wantedInfo.find('workRegion').text(),
        nearLine: wantedInfo.find('nearLine').text(),
        workdayWorkhrCont: wantedInfo.find('workdayWorkhrCont').text(),
        fourIns: wantedInfo.find('fourIns').text(),
        retirepay: wantedInfo.find('retirepay').text(),
        etcWelfare: wantedInfo.find('etcWelfare').text(),
        disableCvntl: wantedInfo.find('disableCvntl').text(),
        //! 아래 3개 뭔가 배열로 줘야 할 것 같은데 테스트해보고 알려주세요
        attachFileInfo: {
          attachFileUrl: wantedInfo.find('attachFileInfo').find('attachFileUrl').text(),
        },
        corpAttachList: {
          attachFileUrl: wantedInfo.find('corpAttachList').find('attachFileUrl').text(),
        },
        keywordList: {
          srchKeywordNm: wantedInfo.find('keywordList').find('srchKeywordNm').text(),
        },
        dtlRecrContUrl: wantedInfo.find('dtlRecrContUrl').text(),
        jobsCd: wantedInfo.find('jobsCd').text(),
        minEdubgIcd: wantedInfo.find('minEdubgIcd').text(),
        maxEdubgIcd: wantedInfo.find('maxEdubgIcd').text(),
        regionCd: wantedInfo.find('regionCd').text(),
        empTpCd: wantedInfo.find('empTpCd').text(),
        enterTpCd: wantedInfo.find('enterTpCd').text(),
        salTpCd: wantedInfo.find('salTpCd').text(),
        staAreaRegionCd: wantedInfo.find('staAreaRegionCd').text(),
        lineCd: wantedInfo.find('lineCd').text(),
        staNmCd: wantedInfo.find('staNmCd').text(),
        exitNoCd: wantedInfo.find('exitNoCd').text(),
        walkDistCd: wantedInfo.find('walkDistCd').text(),
      },
      empchargeInfo: {
        empChargerDpt: empchargeInfo.find('empChargerDpt').text(),
        contactTelno: empchargeInfo.find('contactTelno').text(),
        chargerFaxNo: empchargeInfo.find('chargerFaxNo').text(),
      },
    };
  }
}
