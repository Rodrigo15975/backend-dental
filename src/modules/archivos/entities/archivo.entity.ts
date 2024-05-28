import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Medico } from 'src/modules/medicos/entities/medico.entity';

@Schema({
  timestamps: true,
  collection: 'archivos',
})
export class Archivo extends Document {
  @Prop({
    trim: true,
    required: true,
    lowercase: true,
  })
  nombre: string;

  @Prop({
    trim: true,
    required: true,
    lowercase: true,
  })
  descripcion: string;

  @Prop({
    trim: true,
    required: true,
  })
  url_archivo: string;

  @Prop({
    trim: true,
    required: true,
  })
  id_url_archivo: string;

  @Prop({
    trim: true,
    required: true,
  })
  fechaCreacion: string;

  @Prop({
    trim: true,
    required: true,
  })
  horaCreacion: string;

  @Prop({
    trim: true,
    required: true,
    type: Types.ObjectId,
    ref: Medico.name,
  })
  medico: Medico;
}

export const SchemaArchivo = SchemaFactory.createForClass(Archivo);
