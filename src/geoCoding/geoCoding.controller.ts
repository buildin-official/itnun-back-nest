import { Controller, Get, Query } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { GeoCodingService } from './geoCoding.service';

@Controller('geoCoding')
export class GeoCodingController {
  constructor(private readonly geoCoding: GeoCodingService) {}
  @Get()
  async getGeoCoding(@Query('address') address: string): Promise<string> {
    const result = await this.geoCoding.queryAddress(address);
    return Object.assign(instanceToPlain(result));
  }
}
