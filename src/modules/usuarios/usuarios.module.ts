import { Module } from '@nestjs/common';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { UsuariosController } from './controller/usuarios.controller';

@Module({
  imports: [SharedservicesModule],
  providers: [SharedservicesModule],
  controllers: [UsuariosController],
})
export class UsuariosModule {}
