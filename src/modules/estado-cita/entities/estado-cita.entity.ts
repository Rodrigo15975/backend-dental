import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'estado-cita',
})
export class EstadoCita extends Document {
  @Prop({
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  })
  estado: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  bg: string;
}

export const SchemaEstadoCita = SchemaFactory.createForClass(EstadoCita);
