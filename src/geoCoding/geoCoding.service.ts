import { Injectable } from '@nestjs/common';

import { GeoCodingAPIService } from '@/api/geoCodingAPI.service';

@Injectable()
export class GeoCodingService {
  constructor(private readonly geoAPI: GeoCodingAPIService) {}
  async queryAddress(address: string): Promise<object> {
    const result = await this.geoAPI.queryGeoCodingAPI(address);
    return result;
  }
}
