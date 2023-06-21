import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { BookmarkService } from './bookmark.service';
import {
  BookmarkRemoveDto,
  GoodShopBookmarkDto,
  PlaceBookmarkDto,
  PolicyBookmarkDto,
  RecuritBookmarkDto,
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
  async updatePlaceBookmark(@Req() req: Request, @Body() place: PlaceBookmarkDto): Promise<string> {
    await this.bookmark.updatePlaceBookmark(req.userId, place.placeID);
    return 'Update Bookmark Success!';
  }
  @Delete('/place')
  async deletePlaceBookmark(@Req() req: Request, @Body() bookmark: BookmarkRemoveDto): Promise<string> {
    await this.bookmark.deletePlaceBookmark(req.userId, bookmark.bookmarkID);
    return 'Delete Bookmark Success!';
  }

  @Get('/recurit')
  async getRecuritBookmark(@Req() req: Request): Promise<string> {
    const result = await this.bookmark.getUserRecuritBookmark(req.userId);
    return Object.assign(result);
  }
  @Post('/recurit')
  async updateRecuritBookmark(@Req() req: Request, @Body() recurit: RecuritBookmarkDto): Promise<string> {
    await this.bookmark.updateRecuritBookmark(req.userId, recurit.recuritID);
    return 'Update Bookmark Success!';
  }
  @Delete('/recurit')
  async deleteRecuritBookmark(@Req() req: Request, @Body() bookmark: BookmarkRemoveDto): Promise<string> {
    await this.bookmark.deleteRecuritBookmark(req.userId, bookmark.bookmarkID);
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