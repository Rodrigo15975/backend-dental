import { Inject, Injectable } from '@nestjs/common';
import { CitaFind } from './types/typesFind';
import { Cita } from '../../entities/cita.entity';
import {
  CITA_REPOSITORY,
  CitaRepository,
} from '../../repository/cita-repository';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class CitaFindService implements CitaFind {
  constructor(
    @Inject(CITA_REPOSITORY) private readonly citaRepository: CitaRepository,
    private readonly handledErrors: HandleErrors,
  ) {}
  async findAll(): Promise<Cita[]> {
    return await this.citaRepository.findAll();
  }

  async findById(id: string): Promise<Cita> {
    const cita = await this.citaRepository.findById(id);
    if (!cita)
      this.handledErrors.handleErrorsNotFoundException('Cita no encontrada');
    return cita;
  }
}
