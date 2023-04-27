import { IsIn, IsNumber, IsOptional, Matches, Max, Min } from 'class-validator';

import { AllIsInArray } from '@/lib/decorator/AllIsInArray';

import { localCodeList, majorCodeList, computerSkillCodeList, preferentialCodeList } from './CodeConstant';

export class UserDetailUpdateReqDto {
  // birthDate YYYYMMDD
  // localCode 5 dight code
  // employStatus 0~7 code
  // carrerYear 0~99
  // education 1~7 code
  // major 5 dight code
  // computerSkill 1 dight code list
  // preferential 2 dight code list
  // @Validate(YYYYMMDDChecker)
  @IsOptional()
  @Matches(/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/)
  birthDate: string;
  @IsOptional()
  @IsNumber()
  @IsIn(localCodeList)
  localCode: number;
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(7)
  employStatus: number;
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99)
  carrerYear: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  education: number;
  @IsOptional()
  @AllIsInArray(majorCodeList)
  major: string;
  @IsOptional()
  @AllIsInArray(computerSkillCodeList)
  computerSkill: number[];
  @IsOptional()
  @AllIsInArray(preferentialCodeList)
  preferential: string[];
}
