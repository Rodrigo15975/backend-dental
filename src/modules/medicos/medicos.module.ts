import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { MedicosController } from './controller/medicos.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [MedicosController],
})
export class MedicosModule {}
