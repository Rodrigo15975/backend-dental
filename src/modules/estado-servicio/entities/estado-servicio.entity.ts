import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'estado-servicio',
})
export class EstadoServicio extends Document {
  @Prop({
    lowercase: true,
    trim: true,
  })
  estado_tratamiento: string;
}

export const SchemaEstadoServicio =
  SchemaFactory.createForClass(EstadoServicio);
