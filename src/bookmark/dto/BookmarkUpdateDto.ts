import { IsNumber, IsString, IsUUID, Length } from 'class-validator';

export class PolicyBookmarkDto {
  @IsString()
  @Length(14, 14)
  policyID: string;
}

export class PlaceBookmarkDto {
  @IsString()
  @Length(12, 12)
  placeID: string;
}

export class RecruitBookmarkDto {
  @IsString()
  @Length(16, 16)
  recruitID: string;
}

export class GoodShopBookmarkDto {
  @IsNumber()
  goodShopID: number;
}

export class BookmarkRemoveDto {
  @IsUUID()
  bookmarkID: string;
}
