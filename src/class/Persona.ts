import { Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/modules/roles/entities/role.entity';

export class Persona extends Document {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  dni: string;

  @Prop({
    type: Types.ObjectId,
    ref: Role.name,
  })
  role: Types.ObjectId;

  @Prop({
    required: true,
    lowercase: true,
    trim: true,
  })
  name: string;

  @Prop({
    lowercase: true,
    required: true,
    trim: true,
  })
  apellidos: string;

  @Prop({
    trim: true,
    required: false,
  })
  contraseña?: string;

  @Prop({
    required: true,
    lowercase: true,
    trim: true,
  })
  genero: string;

  @Prop({
    required: true,
    trim: true,
  })
  fechaNacimiento: string;

  @Prop({
    trim: true,
  })
  url_perfil: string;

  @Prop({
    trim: true,
  })
  id_perfil: string;

  @Prop({
    lowercase: true,
    trim: true,
  })
  departamento: string;

  @Prop({
    lowercase: true,
    trim: true,
  })
  distrito: string;

  @Prop({
    lowercase: true,
    trim: true,
  })
  ciudad: string;

  @Prop({
    lowercase: true,
    trim: true,
  })
  direccion: string;
}
