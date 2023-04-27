import { Test, TestingModule } from '@nestjs/testing';

import { setting } from '@/setting';

import { RecruitInfoAPIService } from './recruitInfoAPI.service';

describe('RecruitInfoAPIService', () => {
  let recruitInfoAPIService: RecruitInfoAPIService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [RecruitInfoAPIService],
    }).compile();

    recruitInfoAPIService = app.get<RecruitInfoAPIService>(RecruitInfoAPIService);
  });

  describe('root', () => {
    it('채용정보 - openAPI 요청 테스트', async () => {
      await expect(recruitInfoAPIService.queryWithPagination(setting.worknetAPI.apiKey, 10, 1)).resolves.toHaveLength(
        10,
      );
    });
  });
});
