import { Test, TestingModule } from '@nestjs/testing';
import { InquireRealEstateValueUseCase } from './inquire-real-estate-value.use-case';
import { EstateQueryDto } from '../dto/estate-query.dto';
import { ResasApiException } from '../repositories/resas-api.exception';
import { RealEstateValueData } from '../types/real-estate-value-data.type';

const mockIRealEstateDataSourceRepository = {
  fetchRealEstateValue: jest.fn(),
};

describe('InquireRealEstateValueUseCase', () => {
  let inquireRealEstateValueUseCase: InquireRealEstateValueUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquireRealEstateValueUseCase,
        {
          provide: 'IRealEstateDataSourceRepository',
          useValue: mockIRealEstateDataSourceRepository,
        },
      ],
    }).compile();

    inquireRealEstateValueUseCase = module.get<InquireRealEstateValueUseCase>(
      InquireRealEstateValueUseCase,
    );
  });

  describe('inquire', () => {
    it('正常系: 有効なクエリで不動産取引価格を取得できること', async () => {
      const query: EstateQueryDto = {
        year: 2021,
        prefCode: 13,
        cityCode: '13101',
        displayType: 1,
      };
      const mockResponse: RealEstateValueData = {
        statusCode: 200,
        data: {
          message: null,
          result: {
            prefCode: '13',
            prefName: '東京都',
            cityCode: '13101',
            cityName: '千代田区',
            displayType: '1',
            years: [
              {
                year: 2021,
                value: 2361873,
              },
              {
                year: 2020,
                value: 2308214,
              },
            ],
          },
        },
      };
      mockIRealEstateDataSourceRepository.fetchRealEstateValue.mockResolvedValue(
        mockResponse,
      );

      const result = await inquireRealEstateValueUseCase.inquire(query);

      expect(result).toEqual(mockResponse);
      expect(
        mockIRealEstateDataSourceRepository.fetchRealEstateValue,
      ).toHaveBeenCalledWith(query);
    });

    it('異常系: リポジトリがエラーをスローした場合、例外が再スローされること', async () => {
      const query: EstateQueryDto = {
        year: 2021,
        prefCode: 13,
        cityCode: '13101',
        displayType: 1,
      };
      mockIRealEstateDataSourceRepository.fetchRealEstateValue.mockRejectedValue(
        new ResasApiException('ResasAPI Error', 500),
      );

      await expect(
        inquireRealEstateValueUseCase.inquire(query),
      ).rejects.toThrow(ResasApiException);
    });
  });
});
