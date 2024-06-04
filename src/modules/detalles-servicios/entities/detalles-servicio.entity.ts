import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Detalle } from 'src/modules/detalles/entities/detalle.entity';

@Schema({
  collection: 'detalles-servicios',
})
export class DetallesServicio extends Document {
  @Prop({
    trim: true,
    lowercase: true,
  })
  costo_restante: string;

  @Prop({
    trim: true,
  })
  monto_pagado: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  vuelto_restante: string;

  @Prop({
    lowercase: true,
    trim: true,
  })
  comentarios: string;

  @Prop({
    trim: true,
  })
  fecha_atencion: string;

  @Prop({
    trim: true,
  })
  costo_total: string;

  @Prop([
    {
      trim: true,
      type: Types.ObjectId,
      ref: Detalle.name,
    },
  ])
  detalles_servicios: Detalle[];
}

export const SchemaDetallesServicio =
  SchemaFactory.createForClass(DetallesServicio);
