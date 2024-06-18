import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [SharedservicesModule],

  // controllers: [DetallesController],
})
export class DetallesModule {}
