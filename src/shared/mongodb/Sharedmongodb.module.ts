import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Consultario,
  SchemaConsultorio,
} from 'src/modules/consultario/entities/consultario.entity';
import { Role, SchemaRole } from 'src/modules/roles/entities/role.entity';
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
