import { Injectable } from '@nestjs/common';
import { EstateQueryDto } from 'src/estate/dto/estate-query.dto';
import axios from 'axios';

@Injectable()
export class EstateService {
  async getEstateTransaction(query: EstateQueryDto) {
    const { year, prefCode, cityCode, displayType } = query;
    const url = `https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar?year=${year}&prefCode=${prefCode}&cityCode=${cityCode}&displayType=${displayType}`;
    const headers = { 'X-API-KEY': process.env.RESAS_API_KEY };

    const response = await axios.get(url, { headers });
    console.log('Response:', response.status, response.data);
    return response.data;
  }
}
