import { IsIn, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import { AllIsInArray } from '@/lib/decorator/AllIsInArray';

import {
  careerCodeList,
  computerSkillCodeList,
  educationCodeList,
  localCodeList,
  majorCodeList,
  payTypeCodeList,
  preferentialCodeList,
  workConvCodeList,
  workTypeCodeList,
} from './CodeConstant';

export class RecruitDetailSearchDto {
  @IsNumber()
  @Min(1)
  @Max(1000)
  pageIndex: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  searchKeyword: string;

  @IsOptional()
  @IsIn(payTypeCodeList)
  payType: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(99999)
  minPay: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(99999)
  maxPay: string;

  @IsOptional()
  @IsIn(localCodeList)
  region: string;

  @IsOptional()
  @IsIn(careerCodeList)
  career: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999)
  minCareerM: number;

  @Min(0)
  @Max(999)
  maxCareerM: number;

  @IsOptional()
  @IsIn(educationCodeList)
  education: string;

  @IsOptional()
  @IsIn(majorCodeList)
  major: string;

  @IsOptional()
  @AllIsInArray(workTypeCodeList)
  workType: string[];

  @IsOptional()
  @AllIsInArray(workConvCodeList)
  workConv: string[];

  @IsOptional()
  @AllIsInArray(computerSkillCodeList)
  computerSkill: number[];

  @IsOptional()
  @AllIsInArray(preferentialCodeList)
  preferential: string[];
}
