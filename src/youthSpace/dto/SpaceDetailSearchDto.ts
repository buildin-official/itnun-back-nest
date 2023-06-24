import { IsIn, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import { youthLocationCodeList } from '@/lib/constants/youthConstant';

export class SpaceDetailSearchDto {
  @IsNumber()
  @Min(1)
  @Max(500)
  pageIndex: number;
  @IsOptional()
  @IsString()
  @Length(1, 50)
  searchKeyword: string;
  @IsOptional()
  @IsIn(youthLocationCodeList)
  spaceStateCode: string;
  @IsOptional()
  @IsIn(youthLocationCodeList)
  spaceCityCode: string;
}
