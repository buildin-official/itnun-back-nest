import { IsIn, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

import {
  localCodeList,
  majorCodeList,
  computerSkillCodeList,
  preferentialCodeList,
  educationCodeList,
} from '@/lib/constants/worknetConstants';

export class UserDetailUpdateReqDto {
  // birthDate YYYYMMDD
  // localCode 5 dight code
  @IsOptional()
  @Matches(/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/)
  birthDate: string;

  @IsOptional()
  @IsIn(localCodeList)
  localCode: string;

  @IsOptional()
  @Min(0)
  @Max(7)
  employStatus: number;

  @IsOptional()
  @Min(0)
  @Max(1200)
  carrerMonth: number;

  @IsOptional()
  @IsString()
  @IsIn(educationCodeList)
  education: string;

  @IsOptional()
  @IsIn(majorCodeList, { each: true })
  major: string;

  @IsOptional()
  @IsIn(computerSkillCodeList, { each: true })
  computerSkill: string[];

  @IsOptional()
  @IsIn(preferentialCodeList, { each: true })
  preferential: string[];
}
