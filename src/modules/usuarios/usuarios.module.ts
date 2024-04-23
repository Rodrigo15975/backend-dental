import { Module } from '@nestjs/common';
import { UsuariosController } from './controller/usuarios.controller';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';

@Module({
  imports: [SharedservicesModule],
  controllers: [UsuariosController],
})
export class UsuariosModule {}
