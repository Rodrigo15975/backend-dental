import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { ApoderadoController } from './controller/apoderado.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [ApoderadoController],
})
export class ApoderadoModule {}
