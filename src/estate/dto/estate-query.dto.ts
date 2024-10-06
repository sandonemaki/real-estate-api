import { IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class EstateQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(2009)
  @Max(2021)
  year: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(47)
  prefCode: number;

  @IsString()
  cityCode: string;

  @Type(() => Number)
  @IsInt()
  @IsIn([1, 2, 3, 4, 5])
  displayType: number;
}
