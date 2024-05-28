import { Module } from '@nestjs/common';
import { AsistenciaController } from './controller/asistencia.controller';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [SharedservicesModule],
  controllers: [AsistenciaController],
})
export class AsistenciaModule {}
