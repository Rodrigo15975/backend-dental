import { Inject, Injectable } from '@nestjs/common';
import {
  DETALLE_REPOSITORY,
  DetalleRepository,
} from '../../repository/detalle-repositor';
import { FindTopPaciente, TratamientoFind } from './types/typesFind';

@Injectable()
export class DetallesFindService implements TratamientoFind {
  constructor(
    @Inject(DETALLE_REPOSITORY)
    private readonly detalleRepository: DetalleRepository,
  ) {}

  async findTopPacienteService(): Promise<FindTopPaciente> {
    return await this.detalleRepository.findTopPaciente();
  }
}
