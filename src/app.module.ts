import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConsultarioModule } from './modules/consultario/consultario.module';
import { HorarioModule } from './modules/horario/horario.module';
import { MedicosModule } from './modules/medicos/medicos.module';
import { RolesModule } from './modules/roles/roles.module';
import { ServiciosModule } from './modules/servicios/servicios.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ApiRucModule } from './services/apis/ruc/api-ruc.module';
import { CloudinaryUsuarioModule } from './services/cloudinary-usuario/cloudinary-usuario.module';
import { ApiDniModule } from './services/apis/dni/api-dni.module';
@Module({
  imports: [
    RolesModule,
    ConsultarioModule,
    ApiRucModule,
    UsuariosModule,
    AuthModule,
    HorarioModule,
    MedicosModule,
    ServiciosModule,
    CloudinaryUsuarioModule,
    ApiDniModule,
  ],
  controllers: [],
})
export class AppModule {}
