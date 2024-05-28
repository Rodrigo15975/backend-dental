import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Alergia,
  SchemaAlergia,
} from 'src/modules/alergias/entities/alergia.entity';
import {
  Apoderado,
  SchemaApoderado,
} from 'src/modules/apoderado/entities/apoderado.entity';
import {
  Archivo,
  SchemaArchivo,
} from 'src/modules/archivos/entities/archivo.entity';
import {
  Asistencia,
  SchemaAsistencia,
} from 'src/modules/asistencia/entities/asistencia.entity';
import {
  Consultario,
  SchemaConsultorio,
} from 'src/modules/consultario/entities/consultario.entity';
import {
  Etiqueta,
  SchemaEtiquetas,
} from 'src/modules/etiquetas/entities/etiqueta.entity';
import {
  HistorialClinica,
  SchemaHistorialClinica,
} from 'src/modules/historial-clinica/entities/historial-clinica.entity';
import {
  Horario,
  SchemaHorario,
} from 'src/modules/horario/entities/horario.entity';
import {
  Medico,
  SchemaMedico,
} from 'src/modules/medicos/entities/medico.entity';
import { Nota, SchemaNota } from 'src/modules/nota/entities/nota.entity';
import {
  Paciente,
  SchemaPaciente,
} from 'src/modules/pacientes/entities/paciente.entity';
import {
  Prescripciones,
  SchemaPrescripciones,
} from 'src/modules/prescripciones/entities/prescripcione.entity';
import {
  Receta,
  SchemaReceta,
} from 'src/modules/recetas/entities/receta.entity';
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
        name: Paciente.name,
        schema: SchemaPaciente,
      },
      {
        name: Archivo.name,
        schema: SchemaArchivo,
      },
      {
        name: Alergia.name,
        schema: SchemaAlergia,
      },
      {
        name: Nota.name,
        schema: SchemaNota,
      },

      {
        name: Etiqueta.name,
        schema: SchemaEtiquetas,
      },
      {
        name: Apoderado.name,
        schema: SchemaApoderado,
      },
      {
        name: HistorialClinica.name,
        schema: SchemaHistorialClinica,
      },
      {
        name: Receta.name,
        schema: SchemaReceta,
      },
      {
        name: Prescripciones.name,
        schema: SchemaPrescripciones,
      },
      {
        name: Asistencia.name,
        schema: SchemaAsistencia,
      },
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
