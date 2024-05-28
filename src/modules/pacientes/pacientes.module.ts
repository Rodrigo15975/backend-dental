import { Module } from '@nestjs/common';
import { PacientesController } from './controller/pacientes.controller';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [SharedservicesModule],
  controllers: [PacientesController],
})
export class PacientesModule {}
