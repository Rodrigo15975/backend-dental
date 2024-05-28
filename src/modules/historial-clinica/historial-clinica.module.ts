import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { HistorialClinicaController } from './controller/historial-clinica.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [HistorialClinicaController],
})
export class HistorialClinicaModule {}
