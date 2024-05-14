import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [SharedservicesModule],
})
export class CloudinaryModule {}
