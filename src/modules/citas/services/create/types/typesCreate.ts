import { CreateCitaDto } from 'src/modules/citas/dto/create-cita.dto';

export interface CitaCreate {
  create(data: CreateCitaDto): Promise<void>;
}
