import { Module } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { ConsultarioMongoRespository } from 'src/modules/consultario/repository/consultorio-mongo-repository';
import { CONSULTARIO_REPOSITORY } from 'src/modules/consultario/repository/consultorio-repository';
import { ConsultarioService } from 'src/modules/consultario/services/consultario.service';
import { MongoRepositoryRole } from 'src/modules/roles/repository/mongo-repository-role';
import { REPOSITORY_ROLE } from 'src/modules/roles/repository/repository-role';
import { RolesService } from 'src/modules/roles/services/roles.service';
import { UsuarioMongoRepository } from 'src/modules/usuarios/repository/usuario-mongo-repository';
import { USUARIO_REPOSITORY } from 'src/modules/usuarios/repository/usuario-repository';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { SharedMongodbModule } from '../mongodb/Sharedmongodb.module';

@Module({
  imports: [SharedMongodbModule, HandleErrors],
  providers: [
    CloudinaryService,

    UsuariosService,
    { provide: USUARIO_REPOSITORY, useClass: UsuarioMongoRepository },

    ConsultarioService,
    { provide: CONSULTARIO_REPOSITORY, useClass: ConsultarioMongoRespository },

    RolesService,

    { provide: REPOSITORY_ROLE, useClass: MongoRepositoryRole },
    HandleErrors,
  ],
  exports: [
    RolesService,
    SharedMongodbModule,
    ConsultarioService,
    UsuariosService,
    CloudinaryService,
  ],
})
export class SharedservicesModule {}
