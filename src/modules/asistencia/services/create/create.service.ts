import { Inject, Injectable } from '@nestjs/common';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { CreateAsistenciaDto } from '../../dto/create-asistencia.dto';
import {
  ASISTENCIA_REPOSITORY,
  AsistenciaRepositorio,
} from '../../repository/asistencia-repository';
import { AsistenciaCreate } from './types/typesCreate';

@Injectable()
export class AsistenciaCreateService implements AsistenciaCreate {
  constructor(
    @Inject(ASISTENCIA_REPOSITORY)
    private readonly asistenciaRepository: AsistenciaRepositorio,
    private readonly medicoFindService: MedicoFindService,
  ) {}
  async create(
    createAsistenciaDto: CreateAsistenciaDto,
    idMedico: string,
  ): Promise<void> {
    delete createAsistenciaDto.idMedico;
    const medico = await this.medicoFindService.findByIdMedico(idMedico);
    const dateNow = await this.asistenciaRepository.create(createAsistenciaDto);
    await medico.updateOne({
      $push: {
        asistencia: dateNow._id,
      },
    });
  }
}
