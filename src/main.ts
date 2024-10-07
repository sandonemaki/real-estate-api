import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe, BadRequestException } from '@nestjs/common';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    exceptionFactory: (errors) => {
      const messages = errors.map(
        (error) => ({
          field: error.property,
          errors: Object.values(error.constraints),
        })
      );
      return new BadRequestException({
        statusCode: 400,
        message: messages,
      });
    }
  }));

  await app.listen(3000);
}
bootstrap();
