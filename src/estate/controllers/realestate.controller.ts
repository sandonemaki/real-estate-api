import { Controller, Get, Query } from '@nestjs/common';
import { EstateQueryDto } from 'src/estate/dto/estate-query.dto';
import { InquireRealEstateValueUseCase } from 'src/estate/use-cases/inquire-real-estate-value.use-case';

@Controller('api/v1/townPlanning/estateTransaction')
export class RealEstateController {
  constructor(
    private readonly inquireRealEstateValueUseCase: InquireRealEstateValueUseCase,
  ) {}

  @Get('bar')
  async getEstateTransactionData(@Query() query: EstateQueryDto) {
    return await this.inquireRealEstateValueUseCase.inquire(query);
  }
}
