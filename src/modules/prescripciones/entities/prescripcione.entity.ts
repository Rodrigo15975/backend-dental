import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Medico } from 'src/modules/medicos/entities/medico.entity';

@Schema({
  timestamps: true,
  collection: 'prescripciones',
})
export class Prescripciones extends Document {
  @Prop({
    ref: Medico.name,
    type: Types.ObjectId,
    required: true,
    trim: true,
  })
  medico: Medico;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  prescripcion: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  notaAdicional: string;
  @Prop({
    trim: true,
    lowercase: true,
  })
  responsabilidad: string;
  @Prop({
    trim: true,
  })
  fechaPrescripcion: string;
  @Prop({
    trim: true,
  })
  horaPrescripcion: string;
}

export const SchemaPrescripciones =
  SchemaFactory.createForClass(Prescripciones);
