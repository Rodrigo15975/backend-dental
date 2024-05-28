import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'apoderado',
})
export class Apoderado extends Document {
  @Prop({
    trim: true,
    required: true,
  })
  dni: string;

  @Prop({
    trim: true,
    required: true,
    lowercase: true,
  })
  nombre: string;

  @Prop({ trim: true })
  fechaRegistro: string;

  @Prop({ trim: true })
  horaRegistro: string;

  @Prop({
    trim: true,
    required: true,
    lowercase: true,
  })
  apellidos: string;

  @Prop({
    trim: true,
    required: true,
    lowercase: true,
  })
  celular: string;

  @Prop({
    trim: true,
    required: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    trim: true,
    required: true,
    lowercase: true,
  })
  fuenteCaptacion: string;
}

export const SchemaApoderado = SchemaFactory.createForClass(Apoderado);
