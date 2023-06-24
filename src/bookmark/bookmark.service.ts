import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GoodShopBookmark, SpaceBookmark, PolicyBookmark, RecruitBookmark } from '@/entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(PolicyBookmark) private policyBookmarkRepository: Repository<PolicyBookmark>,
    @InjectRepository(RecruitBookmark) private recruitBookmarkRepository: Repository<RecruitBookmark>,
    @InjectRepository(SpaceBookmark) private placeBookmarkRepository: Repository<SpaceBookmark>,
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

  async getUserRecruitBookmark(userUUID: string): Promise<RecruitBookmark[]> {
    return await this.recruitBookmarkRepository.find({ where: { userUUID: userUUID } });
  }
  async updateRecruitBookmark(userUUID: string, recruitID: string): Promise<void> {
    const newRecruitBookmark = new RecruitBookmark();
    newRecruitBookmark.userUUID = userUUID;
    newRecruitBookmark.recruitID = recruitID;
    await this.recruitBookmarkRepository.save(newRecruitBookmark);
    return;
  }
  async deleteRecruitBookmark(userUUID: string, bookmarkUUID: string): Promise<void> {
    await this.recruitBookmarkRepository.delete({ userUUID: userUUID, bookmarkID: bookmarkUUID });
    return;
  }

  async getUserGoodShopBookmark(userUUID: string): Promise<GoodShopBookmark[]> {
    return await this.goodShopBookmarkRepository.find({ where: { userUUID: userUUID } });
  }
  async updateGoodShopBookmark(userUUID: string, goodShopID: string): Promise<void> {
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
