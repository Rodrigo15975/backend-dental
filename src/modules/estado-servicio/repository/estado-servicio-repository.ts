import { CreateEstadoServicioDto } from '../dto/create-estado-servicio.dto';
import { EstadoServicio } from '../entities/estado-servicio.entity';

export const ESTADO_SERVICIO_REPOSITORY = 'EstadoServicioRepository';

export interface EstadoServicioRepository {
  create(
    createEstadoServicioDto: CreateEstadoServicioDto,
  ): Promise<EstadoServicio>;
  delete(id: string): Promise<void>;
  findAll(): Promise<EstadoServicio[]>;
  findById(id: string): Promise<EstadoServicio>;
}
