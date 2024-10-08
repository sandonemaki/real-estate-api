import { EstateQueryDto } from '../dto/estate-query.dto';
import { RealEstateValueData } from '../types/real-estate-value-data.type';

export interface IRealEstateDataSourceRepository {
  fetchRealEstateValue(query: EstateQueryDto): Promise<RealEstateValueData>;
}
