export interface SuccessResponse {
  statusCode: number;
  data: {
    message: string | null;
    result: {
      prefCode: string;
      prefName: string;
      cityCode: string;
      cityName: string;
      displayType: string;
      years: Array<{
        year: number;
        value: number;
      }>;
    };
  };
}

export interface ValidationErrorResponse {
  statusCode: number;
  message: Array<{
    field: string;
    errors: string[];
  }>;
}

export interface ServerErrorResponse {
  statusCode: number;
  message: string;
}

export type RealEstateValueData =
  | SuccessResponse
  | ValidationErrorResponse
  | ServerErrorResponse;
