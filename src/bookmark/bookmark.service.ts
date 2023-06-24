import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GoodShopBookmark, SpaceBookmark, PolicyBookmark, RecuritBookmark } from '@/entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(PolicyBookmark) private policyBookmarkRepository: Repository<PolicyBookmark>,
    @InjectRepository(SpaceBookmark) private placeBookmarkRepository: Repository<SpaceBookmark>,
    @InjectRepository(RecuritBookmark) private recuritBookmarkRepository: Repository<RecuritBookmark>,
    @InjectRepository(GoodShopBookmark) private goodShopBookmarkRepository: Repository<GoodShopBookmark>,
  ) {
    this.policyBookmarkRepository = policyBookmarkRepository;
  }

  async getUserPolicyBookmark(userUUID: string): Promise<PolicyBookmark[]> {
    return await this.policyBookmarkRepository.find({ where: { userUUID: userUUID } });
  }
  async updatePolicyBookmark(userUUID: string, policyID: string): Promise<void> {
    const newPolicyBookmark = new PolicyBookmark();
    newPolicyBookmark.userUUID = userUUID;
    newPolicyBookmark.policyID = policyID;
    await this.policyBookmarkRepository.save(newPolicyBookmark);
    return;
  }
  async deletePolicyBookmark(userUUID: string, bookmarkUUID: string): Promise<void> {
    await this.policyBookmarkRepository.delete({ userUUID: userUUID, bookmarkID: bookmarkUUID });
    return;
  }

  async getUserPlaceBookmark(userUUID: string): Promise<SpaceBookmark[]> {
    return await this.placeBookmarkRepository.find({ where: { userUUID: userUUID } });
  }
  async updatePlaceBookmark(userUUID: string, placeID: string): Promise<void> {
    const newPlaceBookmark = new SpaceBookmark();
    newPlaceBookmark.userUUID = userUUID;
    newPlaceBookmark.spaceID = placeID;
    await this.placeBookmarkRepository.save(newPlaceBookmark);
    return;
  }
  async deletePlaceBookmark(userUUID: string, bookmarkUUID: string): Promise<void> {
    await this.placeBookmarkRepository.delete({ userUUID: userUUID, bookmarkID: bookmarkUUID });
    return;
  }

  async getUserRecuritBookmark(userUUID: string): Promise<RecuritBookmark[]> {
    return await this.recuritBookmarkRepository.find({ where: { userUUID: userUUID } });
  }
  async updateRecuritBookmark(userUUID: string, recuritID: string): Promise<void> {
    const newRecuritBookmark = new RecuritBookmark();
    newRecuritBookmark.userUUID = userUUID;
    newRecuritBookmark.recuritID = recuritID;
    await this.recuritBookmarkRepository.save(newRecuritBookmark);
    return;
  }
  async deleteRecuritBookmark(userUUID: string, bookmarkUUID: string): Promise<void> {
    await this.recuritBookmarkRepository.delete({ userUUID: userUUID, bookmarkID: bookmarkUUID });
    return;
  }

  async getUserGoodShopBookmark(userUUID: string): Promise<GoodShopBookmark[]> {
    return await this.goodShopBookmarkRepository.find({ where: { userUUID: userUUID } });
  }
  async updateGoodShopBookmark(userUUID: string, goodShopID: number): Promise<void> {
    const newGoodShopBookmark = new GoodShopBookmark();
    newGoodShopBookmark.userUUID = userUUID;
    newGoodShopBookmark.goodShopID = goodShopID;
    await this.goodShopBookmarkRepository.save(newGoodShopBookmark);
    return;
  }
  async deleteGoodShopBookmark(userUUID: string, bookmarkUUID: string): Promise<void> {
    await this.goodShopBookmarkRepository.delete({ userUUID: userUUID, bookmarkID: bookmarkUUID });
    return;
  }
}
