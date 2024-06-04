import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { DetallesServiciosController } from './controller/detalles-servicios.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [DetallesServiciosController],
})
export class DetallesServiciosModule {}
