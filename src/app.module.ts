import { Module } from '@nestjs/common';
import { ConsultarioModule } from './modules/consultario/consultario.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ApiRucModule } from './services/apis/ruc/api-ruc.module';
import { CloudinaryModule } from './services/cloudinary/cloudinary.module';
@Module({
  imports: [
    RolesModule,
    ConsultarioModule,
    ApiRucModule,
    UsuariosModule,
    // CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
