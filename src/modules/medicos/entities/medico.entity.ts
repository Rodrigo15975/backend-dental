import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Persona } from 'src/class/Persona';
import { Servicio } from 'src/modules/servicios/entities/servicio.entity';

@Schema({
  timestamps: true,
  collection: 'medicos',
})
export class Medico extends Persona {
  @Prop([
    {
      type: Types.ObjectId,
      ref: Servicio.name,
    },
  ])
  servicios: Servicio[];
}

export const SchemaMedico = SchemaFactory.createForClass(Medico);
