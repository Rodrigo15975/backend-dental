import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { DetalleServicioController } from './controller/detalle-service.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [DetalleServicioController],
})
export class DetallesModule {}
