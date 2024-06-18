import { CreateEstadoCitaDto } from '../dto/create-estado-cita.dto';
import { EstadoCita } from '../entities/estado-cita.entity';

export const ESTADO_CITA_REPOSITORY = 'EstadoCitaRepository';

export interface EstadoCitaRepository {
  create(data: CreateEstadoCitaDto): Promise<EstadoCita>;
  findAll(): Promise<EstadoCita[]>;

  findById(id: string): Promise<EstadoCita>;
}
