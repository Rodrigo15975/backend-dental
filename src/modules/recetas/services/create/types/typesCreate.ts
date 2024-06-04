import { CreateRecetaDto } from 'src/modules/recetas/dto/create-receta.dto';

export interface RecetaCreate {
  create(createRecetaDto: CreateRecetaDto, id: string): Promise<void>;
}
