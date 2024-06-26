import { Inject, Injectable } from '@nestjs/common';
import {
  DETALLE_REPOSITORY,
  DetalleRepository,
} from '../../repository/detalle-repositor';
import { FindTopPaciente, TratamientoFind } from './types/typesFind';
import { Detalle } from '../../entities/detalle.entity';

@Injectable()
export class DetallesFindService implements TratamientoFind {
  constructor(
    @Inject(DETALLE_REPOSITORY)
    private readonly detalleRepository: DetalleRepository,
  ) {}

  async findTopPacienteService(): Promise<FindTopPaciente> {
    return await this.detalleRepository.findTopPaciente();
  }

  async getServicesReportForDate(
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<Detalle[]> {
    return this.detalleRepository.getServicesReportForDate(
      fechaInicio,
      fechaFin,
    );
  }
}
