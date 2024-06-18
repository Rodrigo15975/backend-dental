import { CreateEstadoCitaDto } from 'src/modules/estado-cita/dto/create-estado-cita.dto';

export interface EstadoCitaCreate {
  create(data: CreateEstadoCitaDto): Promise<void>;
}
