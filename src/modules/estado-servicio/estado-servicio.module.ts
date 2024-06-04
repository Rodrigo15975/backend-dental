import { Module } from '@nestjs/common';
import { EstadoServicioController } from './controller/estado-servicio.controller';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [SharedservicesModule],
  controllers: [EstadoServicioController],
})
export class EstadoServicioModule {}
