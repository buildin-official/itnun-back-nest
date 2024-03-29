import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDetail } from '@/entities/userDetail.entity';

import { UserDetailUpdateReqDto } from './dto/UserDetailUpdateDto';

@Injectable()
export class UserDetailService {
  constructor(@InjectRepository(UserDetail) private userDetailRepository: Repository<UserDetail>) {
    this.userDetailRepository = userDetailRepository;
  }

  async updateUserDetail(userUUID: string, userDetailReq: UserDetailUpdateReqDto): Promise<void> {
    const newUserDetail = new UserDetail();
    newUserDetail.userUUID = userUUID;
    newUserDetail.birthDate = userDetailReq.birthDate == undefined ? null : userDetailReq.birthDate;
    newUserDetail.localCode = userDetailReq.localCode == undefined ? null : userDetailReq.localCode;
    newUserDetail.employStatus = userDetailReq.employStatus == undefined ? null : userDetailReq.employStatus;
    newUserDetail.carrerMonth = userDetailReq.carrerMonth == undefined ? null : userDetailReq.carrerMonth;
    newUserDetail.education = userDetailReq.education == undefined ? null : userDetailReq.education;
    newUserDetail.major = userDetailReq.major == undefined ? null : userDetailReq.major;
    newUserDetail.computerSkill = userDetailReq.computerSkill == undefined ? null : userDetailReq.computerSkill;
    newUserDetail.preferential = userDetailReq.preferential == undefined ? null : userDetailReq.preferential;
    newUserDetail.notification = userDetailReq.notification;

    await this.userDetailRepository.save(newUserDetail);
    return;
  }

  async deleteUserDetail(userUUID: string): Promise<void> {
    await this.userDetailRepository.delete({ userUUID: userUUID });
    return;
  }

  async findOne(userUUID: string): Promise<UserDetail> {
    return await this.userDetailRepository.findOne({ where: { userUUID: userUUID } });
  }
}
