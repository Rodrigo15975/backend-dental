import { Module } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
// Consultorio
import { ConsultarioMongoRespository } from 'src/modules/consultario/repository/consultorio-mongo-repository';
import { CONSULTARIO_REPOSITORY } from 'src/modules/consultario/repository/consultorio-repository';
import { ConsultarioService } from 'src/modules/consultario/services/consultario.service';
import { FilesConsultorioService } from 'src/modules/consultario/services/files/files.consultorio.service';

// Roles
import { MongoRepositoryRole } from 'src/modules/roles/repository/mongo-repository-role';
import { REPOSITORY_ROLE } from 'src/modules/roles/repository/repository-role';
import { RolesService } from 'src/modules/roles/services/roles.service';

// Clouidinary configuracion
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { SharedMongodbModule } from '../mongodb/Sharedmongodb.module';

// Usuarios
import { USUARIO_REPOSITORY } from 'src/modules/usuarios/repository/usuario-repository';
import { UsuarioMongoRepository } from 'src/modules/usuarios/repository/usuario-mongo-repository';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
import { UsuarioDeleteService } from 'src/modules/usuarios/services/delete/delete.service';
import { UsuarioFindService } from 'src/modules/usuarios/services/find/find.service';
import { UsuarioUpdateService } from 'src/modules/usuarios/services/update/update.service';
import { UsuarioCreateService } from 'src/modules/usuarios/services/create/create.service';
// Medicos
import { MedicosService } from 'src/modules/medicos/services/medicos.service';
import { MEDICO_REPOSITORY } from 'src/modules/medicos/repository/medico-repository';
import { MedicoMongoRepository } from 'src/modules/medicos/repository/medico-mongo-repository';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { MedicoCreateService } from 'src/modules/medicos/services/create/create.service';
import { MedicoUpdateService } from 'src/modules/medicos/services/update/update.service';
import { MedicoDeleteService } from 'src/modules/medicos/services/delete/delete.service';

// Servicios
import { ServiciosService } from 'src/modules/servicios/services/servicios.service';
import { SERVICIO_REPOSITORY } from 'src/modules/servicios/repository/servicio-repository';
import { ServicioMongoRespository } from 'src/modules/servicios/repository/servicio-mongo-repository';
import { ServicioFindService } from 'src/modules/servicios/services/find/find.service';
import { ServicioDeleteService } from 'src/modules/servicios/services/delete/delete.service';
import { ServicioUpdateService } from 'src/modules/servicios/services/update/update.service';
import { ServicioCreateService } from 'src/modules/servicios/services/create/create.service';

// config global
import { ConfigModule } from '@nestjs/config';

// Files General(medico,usuario)
import { UsuarioFileService } from 'src/modules/usuarios/services/file/file.service';
import { CloudinaryUsuarioService } from 'src/services/cloudinary-usuario/cloudinary-usuario.service';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedMongodbModule,
    HandleErrors,
  ],
  providers: [
    AggregateQuery,

    // Files General(medico,usuario)
    UsuarioFileService,
    CloudinaryUsuarioService,

    // Usuarios
    UsuarioDeleteService,
    UsuarioFindService,
    UsuarioUpdateService,
    UsuarioCreateService,
    UsuariosService,
    { provide: USUARIO_REPOSITORY, useClass: UsuarioMongoRepository },

    // Servicios
    ServiciosService,
    ServicioCreateService,
    ServicioFindService,
    ServicioDeleteService,
    ServicioUpdateService,
    { provide: SERVICIO_REPOSITORY, useClass: ServicioMongoRespository },

    // Medicos
    MedicoCreateService,
    MedicoFindService,
    MedicosService,
    MedicoUpdateService,
    MedicoDeleteService,
    { provide: MEDICO_REPOSITORY, useClass: MedicoMongoRepository },

    // Roles
    RolesService,
    { provide: REPOSITORY_ROLE, useClass: MongoRepositoryRole },

    // Errors
    HandleErrors,

    // Config logo, portada (CONSULTORIO)(CLOUDINARY)
    CloudinaryService,
    FilesConsultorioService,
    ConsultarioService,
    { provide: CONSULTARIO_REPOSITORY, useClass: ConsultarioMongoRespository },
  ],
  exports: [
    // Agreggate
    AggregateQuery,

    // Files General(medico,usuario)
    UsuarioFileService,
    CloudinaryUsuarioService,

    // Usuarios
    UsuariosService,
    UsuarioFindService,
    UsuarioCreateService,
    UsuarioDeleteService,
    UsuarioUpdateService,

    // Servicios
    ServiciosService,
    ServicioFindService,
    ServicioCreateService,
    ServicioDeleteService,
    ServicioUpdateService,

    // Medicos
    MedicosService,
    MedicoFindService,
    MedicoCreateService,
    MedicoDeleteService,
    MedicoUpdateService,
    // Roles
    RolesService,

    // Consultorio
    ConsultarioService,
    CloudinaryService,
    FilesConsultorioService,

    SharedMongodbModule,
    // se comparte a todos
    ConfigModule,
  ],
})
export class SharedservicesModule {}
