import { Injectable } from '@nestjs/common';
import { UpdateAsistenciaDto } from '../dto/update-asistencia.dto';
import { CreateAsistenciaDto } from '../dto/create-asistencia.dto';
import { AsistenciaCreateService } from './create/create.service';
import { AsistenciaUpdateService } from './update/update.service';

@Injectable()
export class AsistenciaService {
  constructor(
    private readonly createAsistencia: AsistenciaCreateService,
    private readonly updateAsistencia: AsistenciaUpdateService,
  ) {}
  async create(createAsistenciaDto: CreateAsistenciaDto, idMedico: string) {
    return await this.createAsistencia.create(createAsistenciaDto, idMedico);
  }

  async update(id: string, updateAsistenciaDto: UpdateAsistenciaDto) {
    return await this.updateAsistencia.update(id, updateAsistenciaDto);
  }
}
