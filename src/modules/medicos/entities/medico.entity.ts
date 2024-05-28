import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Persona } from 'src/class/Persona';
import { Asistencia } from 'src/modules/asistencia/entities/asistencia.entity';
import { Servicio } from 'src/modules/servicios/entities/servicio.entity';

@Schema({
  timestamps: true,
  collection: 'medicos',
})
export class Medico extends Persona {
  @Prop([
    {
      type: Types.ObjectId,
      ref: Servicio.name,
    },
  ])
  servicios: Servicio[];

  @Prop({
    lowercase: true,
    // vER SI DEJA PASAR EN EL DTO Y CREACION ya que es opcional
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    unique: true,
    trim: true,
  })
  celular: string;

  @Prop({
    required: true,
  })
  activo: boolean;

  @Prop([
    {
      type: Types.ObjectId,
      ref: Asistencia.name,
    },
  ])
  asistencia: Asistencia[];
}

export const SchemaMedico = SchemaFactory.createForClass(Medico);
