import { IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class EstateQueryDto {
  @Type(() => Number)
  @IsInt({ message: '年は整数で入力してください。' })
  @Min(2009, { message: '年は2009年以降である必要があります。' })
  @Max(2021, { message: '年は2021年以前である必要があります。' })
  year: number;

  @Type(() => Number)
  @IsInt({ message: '都道府県コードは整数で入力してください。' })
  @Min(1, { message: '都道府県コードは1以上である必要があります。' })
  @Max(47, { message: '都道府県コードは47以下である必要があります。' })
  prefCode: number;

  @IsString({ message: '市区町村コードは文字列である必要があります。' })
  cityCode: string;

  @Type(() => Number)
  @IsInt({ message: '表示タイプは整数で入力してください。' })
  @IsIn([1, 2, 3, 4, 5], { message: '表示タイプは1から5の間で選択してください。' })
  displayType: number;
}
