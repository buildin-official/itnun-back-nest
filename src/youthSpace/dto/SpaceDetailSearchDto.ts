import { IsIn, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import { spaceLocationCodeList } from './CodeConstant';

export class SpaceDetailSearchDto {
  @IsNumber()
  @Min(1)
  @Max(500)
  pageIndex: number;
  @IsOptional()
  @IsString()
  @Length(1, 14)
  spaceID: string;
  @IsOptional()
  @IsString()
  @Length(1, 50)
  searchKeyword: string;
  @IsOptional()
  @IsIn(spaceLocationCodeList)
  spaceStateCode: string;
  @IsOptional()
  @IsIn(spaceLocationCodeList)
  spaceCityCode: string;
}
