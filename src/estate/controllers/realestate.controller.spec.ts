import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateController } from './realestate.controller';
import { InquireRealEstateValueUseCase } from '../use-cases/inquire-real-estate-value.use-case';
import { BadRequestException } from '@nestjs/common';
import { EstateQueryDto } from '../dto/estate-query.dto';
import { createTestValidationPipe } from './test-helpers';

const mockInquireRealEstateValueUseCase = {
  inquire: jest.fn(),
};

describe('RealEstateController', () => {
  let inquireRealEstateValueUseCase: InquireRealEstateValueUseCase;

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

    inquireRealEstateValueUseCase = module.get<InquireRealEstateValueUseCase>(
      InquireRealEstateValueUseCase,
    );
  });

  describe('getEstateTransactionData', () => {
    it('異常系: year の値が 200 の場合、バリデーションエラーがスローされること', async () => {
      const invalidQuery = {
        year: 200,
        prefCode: 13,
        cityCode: '13101',
        displayType: 1,
      };

      const validationPipe = createTestValidationPipe();

      await expect(
        validationPipe.transform(invalidQuery, {
          type: 'query',
          metatype: EstateQueryDto,
        }),
      ).rejects.toThrow(BadRequestException);

      expect(inquireRealEstateValueUseCase.inquire).not.toHaveBeenCalled();
    });
  });
});
