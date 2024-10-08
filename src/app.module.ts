import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealEstateController } from './estate/controllers/estate/realestate.controller';
import { EstateService } from './estate/services/estate/estate.service';
import { EstateModule } from './estate/estate.module';

@Module({
  imports: [EstateModule],
  controllers: [AppController, RealEstateController],
  providers: [AppService, EstateService],
})
export class AppModule {}
