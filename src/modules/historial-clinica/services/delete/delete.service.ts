import { Inject, Injectable } from '@nestjs/common';
import { HistorialClinicaDelete } from '../types/typesDelete';
import {
  HISTORIAL_CLINICA_REPOSITORY,
  HistorialClinicRepository,
} from '../../repository/historial-clinica-repository';

@Injectable()
export class HistorialClinicaDeleteService implements HistorialClinicaDelete {
  constructor(
    @Inject(HISTORIAL_CLINICA_REPOSITORY)
    private readonly historialClinicoRepository: HistorialClinicRepository,
  ) {}

  async delete(id: string): Promise<void> {
    await this.historialClinicoRepository.delete(id);
  }
}
