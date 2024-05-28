import { CreateHistorialClinicaDto } from 'src/modules/historial-clinica/dto/create-historial-clinica.dto';

export interface HistorialClinicoCreate {
  create(
    createHistorialClinicaDto: CreateHistorialClinicaDto,
    id: string,
  ): Promise<void>;
}
