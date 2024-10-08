import { Injectable, Inject } from '@nestjs/common';
import { IRealEstateDataSourceRepository } from '../repositories/real-estate-data-source.repository.interface';
import { EstateQueryDto } from '../dto/estate-query.dto';
import { RealEstateValueData } from '../types/real-estate-value-data.type';

@Injectable()
export class InquireRealEstateValueUseCase {
  constructor(
    @Inject('IRealEstateDataSourceRepository')
    private readonly realEstateDataSource: IRealEstateDataSourceRepository,
  ) {}

  async inquire(query: EstateQueryDto): Promise<RealEstateValueData> {
    return await this.realEstateDataSource.fetchRealEstateValue(query);
  }
}
