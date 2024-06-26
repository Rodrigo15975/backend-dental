import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'detalles-servicios',
  timestamps: true,
})
export class DetallesServicio extends Document {
  // @Prop({
  //   trim: true,
  //   lowercase: true,
  // })
  // vuelto_restante: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  costo_total: string;

  // @Prop()
  // createdAt: Date;

  // @Prop()
  // updatedAt: Date;

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
    lowercase: true,
  })
  montoTotal: string;
}

export const SchemaDetallesServicio =
  SchemaFactory.createForClass(DetallesServicio);
