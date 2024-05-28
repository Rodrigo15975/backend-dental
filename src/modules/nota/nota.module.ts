import { Module } from '@nestjs/common';
import { NotaController } from './controller/nota.controller';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [SharedservicesModule],
  controllers: [NotaController],
})
export class NotaModule {}
