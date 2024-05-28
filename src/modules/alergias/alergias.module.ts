import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { AlergiasController } from './controller/alergias.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [AlergiasController],
})
export class AlergiasModule {}
