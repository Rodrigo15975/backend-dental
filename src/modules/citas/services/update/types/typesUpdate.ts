import {
  UpdateCitaDto,
  UpdateStatusCitaDto,
} from 'src/modules/citas/dto/update-cita.dto';

export interface CitasUpdate {
  update(data: UpdateCitaDto, id: string): Promise<void>;
  updateCitaChangeDate(data: UpdateCitaDto, id: string): Promise<void>;
  updateCitaListaEspera(data: UpdateStatusCitaDto): Promise<void>;
  updateCitaConfirmada(data: UpdateStatusCitaDto): Promise<void>;
  updateCitaCancelar(data: UpdateStatusCitaDto): Promise<void>;
}
