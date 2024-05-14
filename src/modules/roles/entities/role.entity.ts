import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RolesKey } from './default-role';

@Schema({
  timestamps: true,
  collection: 'roles',
})
export class Role extends Document {
  @Prop({
    unique: true,
    default: 'PACIENTE',
  })
  role: RolesKey;
}

export const SchemaRole = SchemaFactory.createForClass(Role);
