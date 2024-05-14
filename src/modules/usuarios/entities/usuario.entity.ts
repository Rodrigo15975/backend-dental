import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Persona } from 'src/class/Persona';

@Schema({
  collection: 'usuarios',
  timestamps: true,
})
export class Usuario extends Persona {}
export const SchemaUsuario = SchemaFactory.createForClass(Usuario);
