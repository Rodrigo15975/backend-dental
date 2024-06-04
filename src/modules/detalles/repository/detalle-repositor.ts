import { CreateDetallesDto } from '../dto/create-detalle.dto';
import { Detalle } from '../entities/detalle.entity';

export const DETALLE_REPOSITORY = 'DetalleRepository';

export interface DetalleRepository {
  create(data: CreateDetallesDto): Promise<Detalle>;
  delete(id: string): Promise<void>;
}
