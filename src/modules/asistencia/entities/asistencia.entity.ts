import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'asistencia',
})
export class Asistencia extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  fecha: string;

  @Prop({
    required: true,
    default: false,
  })
  asistio: boolean;
}

export const SchemaAsistencia = SchemaFactory.createForClass(Asistencia);
