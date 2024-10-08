import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { EstateQueryDto } from 'src/estate/dto/estate-query.dto';
import { ERROR_MESSAGES } from 'src/estate/constants/message/error-messages';
import { ResasApiException } from './resas-api.exception';

@Injectable()
export class EstateService {
  async getEstateTransaction(query: EstateQueryDto) {
    const { year, prefCode, cityCode, displayType } = query;
    const url = `https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar?year=${year}&prefCode=${prefCode}&cityCode=${cityCode}&displayType=${displayType}`;
    const headers = { 'X-API-KEY': process.env.RESAS_API_KEY };

    const response: AxiosResponse = await axios.get(url, { headers }).catch(error => {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || 500;
        const errorResponse = this.handleErrorResponse(statusCode);
        throw new ResasApiException(errorResponse.message, errorResponse.statusCode);
      }
      throw new ResasApiException(ERROR_MESSAGES.SERVER_ERROR, 500);
    });

    if (response.status >= 200 && response.status < 300) {
      // レスポンスボディ内にエラーステータスが含まれていない場合があるため確認
      if (response.data.statusCode && response.data.statusCode !== "200") {
        const errorResponse = this.handleErrorResponse(parseInt(response.data.statusCode));
        throw new ResasApiException(errorResponse.message, errorResponse.statusCode);
      }
      // 正常なレスポンスの場合そのまま返す
      return {
        statusCode: response.status,
        data: response.data,
      };
    } else {
      const errorResponse = this.handleErrorResponse(response.status);
      throw new ResasApiException(errorResponse.message, errorResponse.statusCode);
    }
  }

  // エラーメッセージの処理
  private handleErrorResponse(statusCode: number) {
    switch (statusCode) {
      case 400:
        return {
          statusCode: 400,
          message: ERROR_MESSAGES.BAD_REQUEST,
        };
      case 403:
        return {
          statusCode: 403,
          message: ERROR_MESSAGES.FORBIDDEN,
        };
      case 404:
        return {
          statusCode: 404,
          message: ERROR_MESSAGES.NOT_FOUND,
        };
      case 429:
        return {
          statusCode: 429,
          message: ERROR_MESSAGES.TOO_MANY_REQUESTS,
        };
      default:
        return {
          statusCode: 500,
          message: ERROR_MESSAGES.SERVER_ERROR,
        };
    }
  }
}
