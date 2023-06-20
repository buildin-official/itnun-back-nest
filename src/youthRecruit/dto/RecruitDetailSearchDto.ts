import { ArrayMaxSize, IsIn, IsNumber, IsOptional, IsString, Length, Max, MaxLength, Min } from 'class-validator';

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
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @Length(1, 50, { each: true })
  searchKeywords?: string[];

  @IsOptional()
  @IsIn(payTypeCodeList)
  payType?: 'D' | 'H' | 'M' | 'Y';

  @IsOptional()
  @IsNumber()
  @Min(1)
  minPay?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxPay?: number;

  @IsOptional()
  @AllIsInArray(localCodeList)
  region?: string[];

  @IsOptional()
  @IsIn(careerCodeList)
  career?: 'N' | 'E' | 'Z';

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999)
  minCareerM?: number;

  @IsOptional()
  @Min(0)
  @Max(999)
  maxCareerM?: number;

  @IsOptional()
  @IsIn(educationCodeList)
  education?: string;

  @IsOptional()
  @IsIn(majorCodeList)
  major?: string;

  @IsOptional()
  @ArrayMaxSize(4)
  @AllIsInArray(workTypeCodeList)
  workType?: Array<'1' | '2' | '3' | '9'>;

  @IsOptional()
  @ArrayMaxSize(8)
  @AllIsInArray(workConvCodeList)
  workConv?: Array<'01' | '02' | '04' | '11' | '12' | '13' | '06' | '09'>;

  @IsOptional()
  @ArrayMaxSize(5)
  @AllIsInArray(computerSkillCodeList)
  computerSkill?: Array<'1' | '2' | '4' | '6' | '9'>;

  @IsOptional()
  @ArrayMaxSize(7)
  @AllIsInArray(preferentialCodeList)
  preferential?: Array<'05' | '07' | '08' | '09' | '10' | '14' | 'S' | 'B'>;
}
