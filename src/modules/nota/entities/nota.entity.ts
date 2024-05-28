import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'notas',
})
export class Nota extends Document {
  @Prop({
    trim: true,
    lowercase: true,
  })
  nota: string;
}

export const SchemaNota = SchemaFactory.createForClass(Nota);
