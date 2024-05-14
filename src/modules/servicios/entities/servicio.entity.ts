import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'servicios',
})
export class Servicio extends Document {
  @Prop({
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  })
  nombre: string;
  @Prop({
    trim: true,
    required: true,
    default: 0.0,
  })
  costo: string;

  @Prop({
    trim: true,
    default: 0,
  })
  count: number;
}

export const SchemaServicios = SchemaFactory.createForClass(Servicio);
