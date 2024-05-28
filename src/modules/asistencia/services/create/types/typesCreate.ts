import { CreateAsistenciaDto } from 'src/modules/asistencia/dto/create-asistencia.dto';

export interface AsistenciaCreate {
  create(
    createAsistenciaDto: CreateAsistenciaDto,
    idMedico: string,
  ): Promise<void>;
}
