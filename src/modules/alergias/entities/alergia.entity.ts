import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'alergias',
})
export class Alergia extends Document {
  @Prop({
    trim: true,
    lowercase: true,
  })
  alergias: string;
}

export const SchemaAlergia = SchemaFactory.createForClass(Alergia);
