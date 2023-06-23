import { IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import { AllIsInArray } from '@/lib/decorator/AllIsInArray';

import { policyLocationCodeList, policyTypeCodeList } from '../../lib/constants/policyConstant';

export class PolicyDetailSearchDto {
  @IsNumber()
  @Min(1)
  @Max(500)
  pageIndex: number;
  @IsOptional()
  @IsString()
  @Length(1, 50)
  searchKeyword: string;
  @IsOptional()
  @AllIsInArray(policyTypeCodeList)
  policyTypeCode: string[];
  @IsOptional()
  @AllIsInArray(policyLocationCodeList)
  policyLocationCode: string[];
}
