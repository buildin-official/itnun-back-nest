import { ArrayMaxSize, IsIn, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

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
} from '@/lib/constants/worknetConstants';

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
  @IsIn(localCodeList, { each: true })
  region?: string[];

  @IsOptional()
  @IsIn(careerCodeList)
  career?: 'N' | 'E' | 'Z';

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999)
  minCareerMonth?: number;

  @IsOptional()
  @Min(0)
  @Max(999)
  maxCareerMonth?: number;

  @IsOptional()
  @IsIn(educationCodeList)
  education?: string;

  @IsOptional()
  @IsIn(majorCodeList)
  major?: string;

  @IsOptional()
  @ArrayMaxSize(4)
  @IsIn(workTypeCodeList, { each: true })
  workType?: Array<'1' | '2' | '3' | '9'>;

  @IsOptional()
  @ArrayMaxSize(8)
  @IsIn(workConvCodeList, { each: true })
  workConv?: Array<'01' | '02' | '04' | '11' | '12' | '13' | '06' | '09'>;

  @IsOptional()
  @ArrayMaxSize(5)
  @IsIn(computerSkillCodeList, { each: true })
  computerSkill?: Array<'1' | '2' | '4' | '6' | '9'>;

  @IsOptional()
  @ArrayMaxSize(7)
  @IsIn(preferentialCodeList, { each: true })
  preferential?: Array<'05' | '07' | '08' | '09' | '10' | '14' | 'S' | 'B'>;
}

export class RecruitIDSearchDto {
  @IsString()
  @Length(16, 16)
  recruitID: string;
}
