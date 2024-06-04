import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EstadoServicio } from 'src/modules/estado-servicio/entities/estado-servicio.entity';
import { Medico } from 'src/modules/medicos/entities/medico.entity';

@Schema({
  collection: 'detalles',
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
}

export const SchemaDetalle = SchemaFactory.createForClass(Detalle);
