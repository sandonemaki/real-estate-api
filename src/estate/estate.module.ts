// src/estate/estate.module.ts
import { Module } from '@nestjs/common';
import { RealEstateController } from './controllers/realestate.controller';
import { InquireRealEstateValueUseCase } from './use-cases/inquire-real-estate-value.use-case';
import { RealEstateDataSourceRepository } from './repositories/real-estate-data-source.repository';

@Module({
  controllers: [RealEstateController],
  providers: [
    InquireRealEstateValueUseCase,
    {
      provide: 'IRealEstateDataSourceRepository',
      useClass: RealEstateDataSourceRepository,
    },
  ],
})
export class EstateModule {}
