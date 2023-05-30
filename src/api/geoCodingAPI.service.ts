import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { setting } from '@/setting';

@Injectable()
export class GeoCodingAPIService {
  async queryGeoCodingAPI(address: string): Promise<object> {
    const apiResponse = axios.get(setting.geoCodingAPI.host, {
      params: { query: address },
      headers: {
        'X-NCP-APIGW-API-KEY-ID': setting.geoCodingAPI.apiID,
        'X-NCP-APIGW-API-KEY': setting.geoCodingAPI.apiKey,
      },
      responseType: 'text',
    });
    const parsedResponse = JSON.parse((await apiResponse).data);
    return parsedResponse;
  }
}
