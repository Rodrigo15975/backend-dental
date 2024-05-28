import { Module } from '@nestjs/common';
import { RecetasController } from './controller/recetas.controller';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [SharedservicesModule],
  controllers: [RecetasController],
})
export class RecetasModule {}
