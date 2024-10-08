import { Controller, Get, Query } from '@nestjs/common';
import { EstateQueryDto } from 'src/estate/dto/estate-query.dto';
import { EstateService } from 'src/estate/services/estate/estate.service';

@Controller('api/v1/townPlanning/estateTransaction')
export class RealEstateController {
  constructor(private readonly estateService: EstateService) {}

  @Get('bar')
  async getEstateTransactionData(@Query() query: EstateQueryDto) {
    return await this.estateService.getEstateTransactionData(query);
  }
}
