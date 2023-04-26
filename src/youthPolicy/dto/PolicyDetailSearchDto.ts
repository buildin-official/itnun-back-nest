import { IsIn, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import { policyLocationCodeList, policyTypeCodeList } from './CodeConstant';

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
  @IsIn(policyTypeCodeList)
  policyTypeCode: string[];
  @IsOptional()
  @IsIn(policyLocationCodeList)
  policyLocationCode: string[];
}
