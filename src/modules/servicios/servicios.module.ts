import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { ServiciosController } from './controller/servicios.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [ServiciosController],
})
export class ServiciosModule {}
