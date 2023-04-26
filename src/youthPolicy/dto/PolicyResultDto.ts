export class PolicyResultDto {
  policyId: string; // 정책 ID
  policyBizLocation: string; // 정책 주관 지역(기관) 코드
  policyBizType: string; // 기관 및 지자체 구분
  policyName: string; // 정책명
  policyIntroduce: string; // 정책 소개
  policyType: string; // 정책 유형
  policySupportAmount: string; // 지원 규모
  policySupportIntroduce: string; // 지원 내용
  policyRequireAge: string; // 참여요건 - 연령
  policyRequireEmployStatus: string; // 참여요건 - 취업상태
  policyRequireEducation: string; // 참여요건 - 학력
  policyRequireMajor: string; // 참여요건 - 전공
  policyRequireSpecializationField: string; // 참여요건 - 특화분야
  policySubmitBizName: string; // 신청 기관명
  policySubmitPeriod: string; // 신청 기간
  policySubmitStep: string; // 신청 절차
  policySubmitJudgementAnnounce: string; // 심사 발표
  policySubmitURL: string; // 사이트 링크 주소
}
