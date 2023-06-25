export interface RecruitResultDto {
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

export interface RecruitDetailDto {
  wantedAuthNo: string;
  corpInfo: {
    corpNm: string;
    reperNm: string;
    totPsncnt: string;
    capitalAmt: string;
    yrSalesAmt: string;
    indTpCdNm: string;
    busiCont: string;
    corpAddr: string;
    homePg: string;
    busiSize: string;
  };
  wantedInfo: {
    jobsNm: string;
    wantedTitle: string;
    relJobsNm: string;
    jobCont: string;
    receiptCloseDt: string;
    empTpNm: string;
    collectPsncnt: string;
    salTpNm: string;
    enterTpNm: string;
    eduNm: string;
    forLang: string;
    major: string;
    certificate: string;
    mltsvcExcHope: string;
    compAbl: string;
    pfCond: string;
    etcPfCond: string;
    selMthd: string;
    rcptMthd: string;
    submitDoc: string;
    etcHopeCont: string;
    workRegion: string;
    nearLine: string;
    workdayWorkhrCont: string;
    fourIns: string;
    retirepay: string;
    etcWelfare: string;
    disableCvntl: string;
    //! 아래 3개 뭔가 배열로 줘야 할 것 같은데 테스트해보고 알려주세요
    //TODO 그렇게 하쇼
    attachFileInfo: {
      attachFileUrl: string;
    };
    corpAttachList: {
      attachFileUrl: string;
    };
    keywordList: {
      srchKeywordNm: string;
    };
    dtlRecrContUrl: string;
    jobsCd: string;
    minEdubgIcd: string;
    maxEdubgIcd: string;
    regionCd: string;
    empTpCd: string;
    enterTpCd: string;
    salTpCd: string;
    staAreaRegionCd: string;
    lineCd: string;
    staNmCd: string;
    exitNoCd: string;
    walkDistCd: string;
  };
  empchargeInfo: {
    empChargerDpt: string;
    contactTelno: string;
    chargerFaxNo: string;
  };
}
