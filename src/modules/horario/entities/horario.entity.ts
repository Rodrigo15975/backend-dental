import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'horario',
})
export class Horario {
  @Prop({
    trim: true,
    required: true,
  })
  inicio: string;
  @Prop({
    trim: true,
    required: true,
  })
  final: string;
}

export const SchemaHorario = SchemaFactory.createForClass(Horario);
