import { Inject, Injectable } from '@nestjs/common';
import { UpdateAsistenciaDto } from '../../dto/update-asistencia.dto';
import {
  ASISTENCIA_REPOSITORY,
  AsistenciaRepositorio,
} from '../../repository/asistencia-repository';
import { AsistenciaUpdate } from './types/typesUpdate';

@Injectable()
export class AsistenciaUpdateService implements AsistenciaUpdate {
  constructor(
    @Inject(ASISTENCIA_REPOSITORY)
    private readonly asistenciaRepository: AsistenciaRepositorio,
  ) {}
  async update(
    id: string,
    updateAsistenciaDto: UpdateAsistenciaDto,
  ): Promise<void> {
    await this.asistenciaRepository.update(id, updateAsistenciaDto);
  }
}
