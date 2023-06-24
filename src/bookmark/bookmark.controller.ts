import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { BookmarkService } from './bookmark.service';
import {
  BookmarkRemoveDto,
  GoodShopBookmarkDto,
  SpaceBookmarkDto,
  PolicyBookmarkDto,
  RecruitBookmarkDto,
} from './dto/BookmarkUpdateDto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmark: BookmarkService) {}

  @Get('/policy')
  async getBookmark(@Req() req: Request): Promise<string> {
    const result = await this.bookmark.getUserPolicyBookmark(req.userId);
    return Object.assign(result);
  }
  @Post('/policy')
  async updateBookmark(@Req() req: Request, @Body() policy: PolicyBookmarkDto): Promise<string> {
    await this.bookmark.updatePolicyBookmark(req.userId, policy.policyID);
    return 'Update Bookmark Success!';
  }
  @Delete('/policy')
  async deleteBookmark(@Req() req: Request, @Body() bookmark: BookmarkRemoveDto): Promise<string> {
    await this.bookmark.deletePolicyBookmark(req.userId, bookmark.bookmarkID);
    return 'Delete Bookmark Success!';
  }

  @Get('/place')
  async getPlaceBookmark(@Req() req: Request): Promise<string> {
    const result = await this.bookmark.getUserPlaceBookmark(req.userId);
    return Object.assign(result);
  }
  @Post('/place')
  async updatePlaceBookmark(@Req() req: Request, @Body() place: SpaceBookmarkDto): Promise<string> {
    await this.bookmark.updatePlaceBookmark(req.userId, place.spaceID);
    return 'Update Bookmark Success!';
  }
  @Delete('/place')
  async deletePlaceBookmark(@Req() req: Request, @Body() bookmark: BookmarkRemoveDto): Promise<string> {
    await this.bookmark.deletePlaceBookmark(req.userId, bookmark.bookmarkID);
    return 'Delete Bookmark Success!';
  }

  @Get('/recruit')
  async getRecruitBookmark(@Req() req: Request): Promise<string> {
    const result = await this.bookmark.getUserRecruitBookmark(req.userId);
    return Object.assign(result);
  }
  @Post('/recruit')
  async updateRecruitBookmark(@Req() req: Request, @Body() recruit: RecruitBookmarkDto): Promise<string> {
    await this.bookmark.updateRecruitBookmark(req.userId, recruit.recruitID);
    return 'Update Bookmark Success!';
  }
  @Delete('/recruit')
  async deleteRecruitBookmark(@Req() req: Request, @Body() bookmark: BookmarkRemoveDto): Promise<string> {
    await this.bookmark.deleteRecruitBookmark(req.userId, bookmark.bookmarkID);
    return 'Delete Bookmark Success!';
  }

  @Get('/goodshop')
  async getGoodShopBookmark(@Req() req: Request): Promise<string> {
    const result = await this.bookmark.getUserGoodShopBookmark(req.userId);
    return Object.assign(result);
  }
  @Post('/goodshop')
  async updateGoodShopBookmark(@Req() req: Request, @Body() goodshop: GoodShopBookmarkDto): Promise<string> {
    await this.bookmark.updateGoodShopBookmark(req.userId, goodshop.goodShopID);
    return 'Update Bookmark Success!';
  }
  @Delete('/goodshop')
  async deleteGoodShopBookmark(@Req() req: Request, @Body() bookmark: BookmarkRemoveDto): Promise<string> {
    await this.bookmark.deleteGoodShopBookmark(req.userId, bookmark.bookmarkID);
    return 'Delete Bookmark Success!';
  }
}
