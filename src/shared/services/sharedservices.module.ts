import { Module } from '@nestjs/common';
import { SharedMongodbModule } from '../mongodb/Sharedmongodb.module';
import { RolesService } from 'src/modules/roles/services/roles.service';
import { REPOSITORY_ROLE } from 'src/modules/roles/repository/repository-role';
import { MongoRepositoryRole } from 'src/modules/roles/repository/mongo-repository-role';
import { CONSULTARIO_REPOSITORY } from 'src/modules/consultario/repository/consultorio-repository';
import { ConsultarioMongoRespository } from 'src/modules/consultario/repository/consultorio-mongo-repository';
import { ConsultarioService } from 'src/modules/consultario/services/consultario.service';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
import { USUARIO_REPOSITORY } from 'src/modules/usuarios/repository/usuario-repository';
import { UsuarioMongoRepository } from 'src/modules/usuarios/repository/usuario-mongo-repository';

@Module({
  imports: [SharedMongodbModule, HandleErrors],
  providers: [
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
  ],
})
export class SharedservicesModule {}
