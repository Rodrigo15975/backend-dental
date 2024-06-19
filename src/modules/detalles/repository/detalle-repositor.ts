import { CreateDetallesDto } from '../dto/create-detalle.dto';
import { Detalle } from '../entities/detalle.entity';
import { FindTopPaciente } from '../services/find/types/typesFind';

export const DETALLE_REPOSITORY = 'DetalleRepository';

export interface DetalleRepository {
  create(data: CreateDetallesDto): Promise<Detalle>;
  delete(id: string): Promise<void>;
  // para encontrar el documento de talles para cambiar el docClone a true
  findById(id: string): Promise<Detalle>;

  findTopPaciente(): Promise<FindTopPaciente>;
}
