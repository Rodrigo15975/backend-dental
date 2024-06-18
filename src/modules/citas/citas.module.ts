import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { CitasController } from './controller/citas.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [CitasController],
})
export class CitasModule {}
