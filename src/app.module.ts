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
import { AsistenciaModule } from './modules/asistencia/asistencia.module';
import { PrescripcionesModule } from './modules/prescripciones/prescripciones.module';
import { RecetasModule } from './modules/recetas/recetas.module';
import { HistorialClinicaModule } from './modules/historial-clinica/historial-clinica.module';
import { ApoderadoModule } from './modules/apoderado/apoderado.module';
import { EtiquetasModule } from './modules/etiquetas/etiquetas.module';
import { NotaModule } from './modules/nota/nota.module';
import { AlergiasModule } from './modules/alergias/alergias.module';
import { ArchivosModule } from './modules/archivos/archivos.module';
import { PacientesModule } from './modules/pacientes/pacientes.module';
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
    AsistenciaModule,
    PrescripcionesModule,
    RecetasModule,
    HistorialClinicaModule,
    ApoderadoModule,
    EtiquetasModule,
    NotaModule,
    AlergiasModule,
    ArchivosModule,
    PacientesModule,
  ],
  controllers: [],
})
export class AppModule {}
