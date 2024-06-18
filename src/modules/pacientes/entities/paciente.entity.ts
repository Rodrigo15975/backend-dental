import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Persona } from 'src/class/Persona';
import { Alergia } from 'src/modules/alergias/entities/alergia.entity';
import { Apoderado } from 'src/modules/apoderado/entities/apoderado.entity';
import { Archivo } from 'src/modules/archivos/entities/archivo.entity';
import { Cita } from 'src/modules/citas/entities/cita.entity';

import { DetallesServicio } from 'src/modules/detalles-servicios/entities/detalles-servicio.entity';
import { Detalle } from 'src/modules/detalles/entities/detalle.entity';
import { Etiqueta } from 'src/modules/etiquetas/entities/etiqueta.entity';
import { HistorialClinica } from 'src/modules/historial-clinica/entities/historial-clinica.entity';
import { Nota } from 'src/modules/nota/entities/nota.entity';
import { Prescripciones } from 'src/modules/prescripciones/entities/prescripcione.entity';
import { Receta } from 'src/modules/recetas/entities/receta.entity';

@Schema({
  collection: 'pacientes',
  timestamps: true,
})
export class Paciente extends Persona {
  // vER SI DEJA PASAR EN EL DTO Y CREACION ya que es opcional
  @Prop({
    lowercase: true,
    trim: true,
    unique: false,
  })
  email: string;

  @Prop({
    unique: false,
    trim: true,
  })
  celular: string;

  @Prop([
    {
      type: Types.ObjectId,
      ref: Etiqueta.name,
    },
  ])
  etiquetas: Etiqueta[];

  @Prop({
    type: Types.ObjectId,
    ref: Nota.name,
  })
  nota: Nota;

  @Prop({
    type: Types.ObjectId,
    ref: Alergia.name,
  })
  alergia: Alergia;

  @Prop({
    trim: true,
    lowercase: true,
  })
  fuenteCaptacion: string;

  @Prop([
    {
      type: Types.ObjectId,
      ref: Apoderado.name,
    },
  ])
  apoderado: Apoderado[];

  @Prop({
    trim: true,
    default: false,
  })
  mayorEdad: boolean;

  @Prop({ trim: true })
  fechaRegistro: string;

  @Prop({ trim: true })
  horaRegistro: string;

  @Prop([
    {
      type: Types.ObjectId,
      ref: HistorialClinica.name,
    },
  ])
  historialClinico: HistorialClinica[];

  @Prop([
    {
      ref: 'Cita',
      type: Types.ObjectId,
    },
  ])
  citas: Cita[];

  @Prop([
    {
      type: Types.ObjectId,
      ref: DetallesServicio.name,
    },
  ])
  detallesServicios: DetallesServicio[];

  @Prop([
    {
      trim: true,
      type: Types.ObjectId,
      ref: Detalle.name,
    },
  ])
  detalles: Detalle[];

  @Prop([
    {
      type: Types.ObjectId,
      ref: Receta.name,
    },
  ])
  recetaMedica: Receta[];

  @Prop([
    {
      type: Types.ObjectId,
      ref: Prescripciones.name,
    },
  ])
  prescripciones: Prescripciones[];

  @Prop([
    {
      type: Types.ObjectId,
      ref: Archivo.name,
    },
  ])
  archivos: Archivo[];
}

export const SchemaPaciente = SchemaFactory.createForClass(Paciente);
