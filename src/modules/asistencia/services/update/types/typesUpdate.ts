import { UpdateAsistenciaDto } from 'src/modules/asistencia/dto/update-asistencia.dto';

export interface AsistenciaUpdate {
  update(id: string, updateAsistenciaDto: UpdateAsistenciaDto): Promise<void>;
}
