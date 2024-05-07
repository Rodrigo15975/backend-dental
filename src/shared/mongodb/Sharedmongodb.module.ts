import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Consultario,
  SchemaConsultorio,
} from 'src/modules/consultario/entities/consultario.entity';
import {
  Horario,
  SchemaHorario,
} from 'src/modules/horario/entities/horario.entity';
import {
  Medico,
  SchemaMedico,
} from 'src/modules/medicos/entities/medico.entity';
import { Role, SchemaRole } from 'src/modules/roles/entities/role.entity';
import {
  SchemaServicios,
  Servicio,
} from 'src/modules/servicios/entities/servicio.entity';
import {
  SchemaUsuario,
  Usuario,
} from 'src/modules/usuarios/entities/usuario.entity';

// creas tu database en .net/nombredatabase
//  @......mongodb.net HOST
// El sharedMongo es global,
// el config, lo hace global
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forFeature([
      {
        name: Servicio.name,
        schema: SchemaServicios,
      },
      {
        name: Medico.name,
        schema: SchemaMedico,
      },
      {
        name: Horario.name,
        schema: SchemaHorario,
      },
      {
        name: Usuario.name,
        schema: SchemaUsuario,
      },

      {
        name: Role.name,
        schema: SchemaRole,
      },
      {
        name: Consultario.name,
        schema: SchemaConsultorio,
      },
    ]),
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URI),
  ],
  exports: [MongooseModule],
})
export class SharedMongodbModule {}
