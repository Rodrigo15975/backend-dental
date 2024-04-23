import { Module } from '@nestjs/common';
import { RolesModule } from './modules/roles/roles.module';
import { ConsultarioModule } from './modules/consultario/consultario.module';
import { ApiRucModule } from './services/apis/ruc/api-ruc.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
@Module({
  imports: [RolesModule, ConsultarioModule, ApiRucModule, UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
