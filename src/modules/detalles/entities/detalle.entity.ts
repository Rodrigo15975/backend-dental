import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EstadoServicio } from 'src/modules/estado-servicio/entities/estado-servicio.entity';
import { Medico } from 'src/modules/medicos/entities/medico.entity';

@Schema({
  collection: 'detalles',
  timestamps: true,
})
export class Detalle extends Document {
  @Prop({
    trim: true,
    ref: EstadoServicio.name,
    type: Types.ObjectId,
  })
  estado_tratamiento: EstadoServicio;

  @Prop({
    trim: true,
    type: Types.ObjectId,
    ref: Medico.name,
  })
  medico: Medico;

  @Prop({
    trim: true,
    lowercase: true,
  })
  servicio: string;

  @Prop({
    trim: true,
  })
  costo_servicio: string;

  @Prop({
    trim: true,
  })
  fecha_atencion: string;
  @Prop({
    trim: true,
  })
  costo_restante: string;

  @Prop({
    default: false,
  })
  docClone: boolean;

  @Prop({
    trim: true,
  })
  monto_pagado: string;
}

export const SchemaDetalle = SchemaFactory.createForClass(Detalle);
