import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Persona } from 'src/class/Persona';

@Schema({
  collection: 'usuarios',
  timestamps: true,
})
export class Usuario extends Persona {
  @Prop({
    lowercase: true,
    // vER SI DEJA PASAR EN EL DTO Y CREACION ya que es opcional
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    unique: true,
    trim: true,
  })
  celular: string;
}
export const SchemaUsuario = SchemaFactory.createForClass(Usuario);
