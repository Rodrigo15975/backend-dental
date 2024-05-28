import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'etiquetas',
  timestamps: true,
})
export class Etiqueta extends Document {
  @Prop({
    trim: true,
    lowercase: true,
  })
  etiqueta: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  bgColor: string;
}

export const SchemaEtiquetas = SchemaFactory.createForClass(Etiqueta);
