import { CreateCitaDto } from '../dto/create-cita.dto';
import { UpdateCitaDto } from '../dto/update-cita.dto';
import { Cita } from '../entities/cita.entity';

export const CITA_REPOSITORY = 'CitaRepository';

export interface CitaRepository {
  create(data: CreateCitaDto): Promise<Cita>;
  findAll(): Promise<Cita[]>;
  update({ end, start }: UpdateCitaDto, id: string): Promise<Cita>;
  findById(id: string): Promise<Cita>;
  updateCitaChangeDate(
    { end, start }: UpdateCitaDto,
    id: string,
  ): Promise<Cita>;

  deleteCita(idCita: string): Promise<void>;
}
