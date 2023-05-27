import { Controller, Get } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { YouthNewsService } from './youthNews.service';

@Controller('youthnews')
export class YouthNewsController {
  constructor(private readonly youthNews: YouthNewsService) {}
  @Get()
  async youthNewsGet(): Promise<string> {
    const result = await this.youthNews.getYouthNews();
    return Object.assign(instanceToPlain(result));
  }
}
