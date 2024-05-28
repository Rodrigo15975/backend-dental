import { CreateRecetaDto } from '../dto/create-receta.dto';
import { Receta } from '../entities/receta.entity';

export const RECETA_REPOSITORY = 'RecetaRepository';

export interface RecetaRepository {
  create(createRecetaDto: CreateRecetaDto): Promise<Receta>;
}
