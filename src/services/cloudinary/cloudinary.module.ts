import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { CloudinaryController } from './cloudinary.controller';

@Module({
  imports: [SharedservicesModule],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
