import { CreateEtiquetaDto } from '../dto/create-etiqueta.dto';
import { Etiqueta } from '../entities/etiqueta.entity';

export const ETIQUETA_REPOSITORY = 'EtiquetaRepository';

export interface EtiquetaRepository {
  create(createEtiquetaDto: CreateEtiquetaDto): Promise<Etiqueta>;
  findById(id: string): Promise<Etiqueta>;
  remove(id: string): Promise<Etiqueta>;
  findAll(): Promise<Etiqueta[]>;
}
