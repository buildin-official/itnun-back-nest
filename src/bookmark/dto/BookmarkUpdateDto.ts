import { IsNumber, IsString, IsUUID, Length } from 'class-validator';

export class PolicyBookmarkDto {
  @IsString()
  @Length(14, 14)
  policyID: string;
}

export class SpaceBookmarkDto {
  @IsString()
  @Length(12, 12)
  spaceID: string;
}

export class RecuritBookmarkDto {
  @IsString()
  @Length(16, 16)
  recuritID: string;
}

export class GoodShopBookmarkDto {
  @IsNumber()
  goodShopID: number;
}

export class BookmarkRemoveDto {
  @IsUUID()
  bookmarkID: string;
}
