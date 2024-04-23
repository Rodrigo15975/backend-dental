import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from './default-role';

@Schema({
  timestamps: true,
  collection: 'roles',
})
export class Role {
  @Prop({
    unique: true,
    default: Roles.paciente,
  })
  role: Roles;
}

export const SchemaRole = SchemaFactory.createForClass(Role);
