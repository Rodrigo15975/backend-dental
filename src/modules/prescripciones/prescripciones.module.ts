import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { PrescripcionesController } from './controllers/prescripciones.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [PrescripcionesController],
})
export class PrescripcionesModule {}
