import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Persona } from 'src/class/Persona';

@Schema({
  timestamps: true,
  collection: 'medicos',
})
export class Medico extends Persona {
  id: string;
}

export const SchemaMedico = SchemaFactory.createForClass(Medico);
