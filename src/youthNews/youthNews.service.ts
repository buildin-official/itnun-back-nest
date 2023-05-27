import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';

import { setting } from '@/setting';

import { NewsResultDto } from './dto/NewsResultDto';

@Injectable()
export class YouthNewsService {
  // 청년 일보의 청년 뉴스 첫 페이지 크롤링
  async getYouthNews(): Promise<NewsResultDto[]> {
    const result: NewsResultDto[] = [];
    const newsDocument = await axios.get(setting.youthNews.host);
    const $ = load(newsDocument.data);
    const newsList = $('.art_list_all').children();
    for await (const news of newsList) {
      result.push({
        newsTitle: $(news).find('a h2').text(),
        newsDescription: $(news).find('a p').text(),
        newsReporter: $(news).find('a ul .name').text(),
        newsDate: $(news).find('a ul .date').text(),
        newsURI: $(news).find('a').attr('href'),
      });
    }
    return result;
  }
}
