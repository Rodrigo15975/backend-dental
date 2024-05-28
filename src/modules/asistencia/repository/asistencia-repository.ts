import { CreateAsistenciaDto } from '../dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from '../dto/update-asistencia.dto';
import { Asistencia } from '../entities/asistencia.entity';

export const ASISTENCIA_REPOSITORY = 'AsistenciaRepositorio';

export interface AsistenciaRepositorio {
  create(createAsistenciaDto: CreateAsistenciaDto): Promise<Asistencia>;
  update(
    id: string,
    updateAsistenciaDto: UpdateAsistenciaDto,
  ): Promise<Asistencia>;
}
