import { ValidationPipe, BadRequestException } from '@nestjs/common';

export function createTestValidationPipe() {
  return new ValidationPipe({
    transform: true,
    exceptionFactory: (errors) => {
      const messages = errors.map((error) => ({
        field: error.property,
        errors: Object.values(error.constraints),
      }));
      return new BadRequestException({
        statusCode: 400,
        message: messages,
      });
    },
  });
}
