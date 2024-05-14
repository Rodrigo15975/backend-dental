import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { CloudinaryUsuarioService } from './cloudinary-usuario.service';

@Module({
  imports: [SharedservicesModule],
  providers: [CloudinaryUsuarioService],
})
export class CloudinaryUsuarioModule {}
