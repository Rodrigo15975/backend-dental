import { EstadoServicio } from 'src/modules/estado-servicio/entities/estado-servicio.entity';

export interface EstadoServicioFind {
  findAll(): Promise<EstadoServicio[]>;
  findById(id: string): Promise<EstadoServicio>;
}
