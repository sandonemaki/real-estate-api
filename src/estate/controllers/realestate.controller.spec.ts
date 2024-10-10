import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateController } from './realestate.controller';
import { InquireRealEstateValueUseCase } from '../use-cases/inquire-real-estate-value.use-case';
import { BadRequestException } from '@nestjs/common';
import { EstateQueryDto } from '../dto/estate-query.dto';
import { RealEstateValueData } from '../types/real-estate-value-data.type';
import { createTestValidationPipe } from './test-helpers';

const mockInquireRealEstateValueUseCase = {
  inquire: jest.fn(),
};

describe('RealEstateController', () => {
  let realEstateController: RealEstateController;
  //let validationPipe: ValidationPipe;
  const validationPipe = createTestValidationPipe();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealEstateController],
      providers: [
        {
          provide: InquireRealEstateValueUseCase,
          useValue: mockInquireRealEstateValueUseCase,
        },
      ],
    }).compile();

    realEstateController =
      module.get<RealEstateController>(RealEstateController);
  });

  describe('getEstateTransactionData', () => {
    it('異常系: 無効なクエリの場合、バリデーションエラーがスローされること', async () => {
      const invalidQueries = [
        { year: 2008, prefCode: 13, cityCode: '13101', displayType: 1 }, //   年が2009未満の場合
        { year: 2022, prefCode: 13, cityCode: '13101', displayType: 1 }, //   年が2021より大きい場合
        { year: 2015.5, prefCode: 13, cityCode: '13101', displayType: 1 }, // 年が小数点を含む場合
        { year: 2021, prefCode: 0, cityCode: '13101', displayType: 1 }, //    都道府県コードが1未満の場合
        { year: 2021, prefCode: 48, cityCode: '13101', displayType: 1 }, //   都道府県コードが47より大きい場合
        { year: 2021, prefCode: 13.5, cityCode: '13101', displayType: 1 }, // 都道府県コードが小数点を含む場合
        { year: 2021, prefCode: 13, cityCode: '131011', displayType: 1 }, //  市区町村コードが6桁の場合
        { year: 2021, prefCode: 13, cityCode: '1310', displayType: 1 }, //    市区町村コードが4桁の場合
        { year: 2021, prefCode: 13, cityCode: 'abcde', displayType: 1 }, //   市区町村コードが数字以外を含む場合
        { year: 2021, prefCode: 13, cityCode: '13101', displayType: 0 }, //   表示タイプが1未満の場合
        { year: 2021, prefCode: 13, cityCode: '13101', displayType: 6 }, //   表示タイプが5より大きい場合
        { year: 2021, prefCode: 13, cityCode: '13101', displayType: 2.5 }, // 表示タイプが小数点を含む場合
      ];

      for (const query of invalidQueries) {
        await expect(
          validationPipe.transform(query, {
            type: 'query',
            metatype: EstateQueryDto,
          }),
        ).rejects.toThrow(BadRequestException);
      }
    });
  });
});
