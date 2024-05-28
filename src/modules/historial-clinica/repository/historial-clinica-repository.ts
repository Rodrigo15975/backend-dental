import { CreateHistorialClinicaDto } from '../dto/create-historial-clinica.dto';
import { HistorialClinica } from '../entities/historial-clinica.entity';

export const HISTORIAL_CLINICA_REPOSITORY = 'HistorialClinicaRepository';

export interface HistorialClinicRepository {
  create(
    createHistorialClinicaDto: CreateHistorialClinicaDto,
  ): Promise<HistorialClinica>;

  delete(id: string): Promise<void>;
}
