import { Module } from '@nestjs/common';
import { EtiquetasController } from './controller/etiquetas.controller';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [SharedservicesModule],
  controllers: [EtiquetasController],
})
export class EtiquetasModule {}
