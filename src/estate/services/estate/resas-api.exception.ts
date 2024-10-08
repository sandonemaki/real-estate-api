import { HttpException } from '@nestjs/common';

export class ResasApiException extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
