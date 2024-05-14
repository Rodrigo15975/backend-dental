import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { ConsultarioController } from './controller/consultario.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [ConsultarioController],
})
export class ConsultarioModule {}
