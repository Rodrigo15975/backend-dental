import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { AsistenciaController } from './controller/asistencia.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [AsistenciaController],
  providers: [],
})
export class AsistenciaModule {}
