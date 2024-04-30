import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'fotos',
})
export class ModeloFoto {
  @Prop()
  url: string;
  @Prop()
  name: string;
}

export const schemafoto = SchemaFactory.createForClass(ModeloFoto);
