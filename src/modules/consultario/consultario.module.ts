import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { ConsultarioController } from './controller/consultario.controller';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';

@Module({
  imports: [SharedservicesModule, CloudinaryModule],
  controllers: [ConsultarioController],
})
export class ConsultarioModule {}
