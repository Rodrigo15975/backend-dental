import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'historial-clinica',
  timestamps: true,
})
export class HistorialClinica extends Document {
  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  enfermedad: string;

  @Prop({
    trim: true,
  })
  fecha: string;
  @Prop({
    trim: true,
  })
  hora: string;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  tiempo: string;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
  })
  sintomas: string;

  @Prop({
    trim: true,
  })
  presion_alta: boolean;

  @Prop({
    trim: true,
  })
  presion_baja: boolean;

  @Prop({
    trim: true,
  })
  hepatitis: boolean;

  @Prop({
    trim: true,
  })
  ulcera: boolean;

  @Prop({
    trim: true,
  })
  asma: boolean;

  @Prop({
    trim: true,
  })
  gastritis: boolean;

  @Prop({
    trim: true,
  })
  diabetes: boolean;

  @Prop({
    trim: true,
  })
  alergias: boolean;

  @Prop({
    trim: true,
  })
  enfermedad_sanguinea: boolean;

  @Prop({
    trim: true,
  })
  problemas_cardiacos: boolean;

  @Prop({
    trim: true,
  })
  medicina_permanente: boolean;

  @Prop({
    trim: true,
  })
  sangrado_encias: boolean;
}

export const SchemaHistorialClinica =
  SchemaFactory.createForClass(HistorialClinica);
