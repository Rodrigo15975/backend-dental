import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { ArchivosController } from './controller/archivos.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [ArchivosController],
})
export class ArchivosModule {}
