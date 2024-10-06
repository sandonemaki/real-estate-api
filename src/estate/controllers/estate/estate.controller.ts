import { Controller, Get, Query } from '@nestjs/common';
import { EstateQueryDto } from 'src/estate/dto/estate-query.dto';
import { EstateService } from 'src/estate/services/estate/estate.service';

// 次のurlを実行することにより、結果を確認することができます
// http://localhost:3000/api/v1/townPlanning/estateTransaction/bar?
// year=2015&prefCode=13&cityCode=13101&displayType=1
@Controller('api/v1/townPlanning/estateTransaction')
export class EstateController {
  constructor(private readonly estateService: EstateService) {}

  @Get('bar')
  async getEstateTransaction(@Query() query: EstateQueryDto) {
    return await this.estateService.getEstateTransaction(query);
  }
}
