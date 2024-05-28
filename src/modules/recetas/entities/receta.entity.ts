import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Medico } from 'src/modules/medicos/entities/medico.entity';

@Schema({
  timestamps: true,
  collection: 'recetas',
})
export class Receta {
  @Prop({
    ref: Medico.name,
    type: Types.ObjectId,
    required: true,
    trim: true,
  })
  medico: Medico;

  @Prop({
    trim: true,
  })
  fechaReceta: string;

  @Prop({
    trim: true,
  })
  horaReceta: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  notaAdicional: string;
}

export const SchemaReceta = SchemaFactory.createForClass(Receta);
