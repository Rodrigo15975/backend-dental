import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'consultorio',
  timestamps: true,
})
export class Consultario {
  @Prop({
    trim: true,
  })
  img_consultorio: string;

  @Prop({
    trim: true,
  })
  img_logo: string;

  @Prop({
    trim: true,
  })
  id_logo: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  nombre_comercial: string;

  @Prop({
    trim: true,
    required: true,
    unique: true,
  })
  ruc: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  razon_social: string;

  @Prop({
    trim: true,
  })
  id_img_consultorio: string;

  @Prop({
    trim: true,
  })
  telefono: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  estado: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  condicion: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  direccion: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  departamento: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  provincia: string;

  @Prop({
    trim: true,
    lowercase: true,
  })
  distrito: string;

  @Prop({
    default: false,
  })
  isRegisterConsultorio: boolean;
}

export const SchemaConsultorio = SchemaFactory.createForClass(Consultario);
