import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { EstadoCitaController } from './controller/estado-cita.controller';
@Module({
  imports: [SharedservicesModule],
  controllers: [EstadoCitaController],
})
export class EstadoCitaModule {}
