import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EstadoCita } from 'src/modules/estado-cita/entities/estado-cita.entity';
import { Medico } from 'src/modules/medicos/entities/medico.entity';
import { Paciente } from 'src/modules/pacientes/entities/paciente.entity';

@Schema({
  collection: 'citas',
  timestamps: true,
})
export class Cita extends Document {
  @Prop({
    trim: true,
    type: Types.ObjectId,
    ref: Paciente.name,
  })
  paciente: Paciente;

  @Prop({
    trim: true,
    ref: EstadoCita.name,
    type: Types.ObjectId,
  })
  estado: EstadoCita;

  @Prop({
    trim: true,
    ref: Medico.name,
    type: Types.ObjectId,
  })
  medico: Medico;

  // @Prop({
  //   trim: true,
  //   lowercase: true,
  // })
  // servicio: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  observacion: string;

  @Prop({
    trim: true,
  })
  start: string;

  @Prop({
    trim: true,
  })
  end: string;
}

export const SchemaCita = SchemaFactory.createForClass(Cita);
