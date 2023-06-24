import { IsIn, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

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
  @IsIn(policyTypeCodeList, { each: true })
  policyTypeCode: string[];
  @IsOptional()
  @IsIn(policyLocationCodeList, { each: true })
  policyLocationCode: string[];
}
export class PolicyIDSearchDto {
  @IsString()
  @Length(14, 14)
  policyID: string;
}
