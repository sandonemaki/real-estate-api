import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstateController } from './estate/controllers/estate/estate.controller';
import { EstateService } from './estate/services/estate/estate.service';
import { EstateModule } from './estate/estate.module';

@Module({
  imports: [EstateModule],
  controllers: [AppController, EstateController],
  providers: [AppService, EstateService],
})
export class AppModule {}
