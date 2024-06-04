import { Inject, Injectable } from '@nestjs/common';
import {
  PRESCRIPCIONE_REPOSITORY,
  PrescripcionesRepository,
} from '../../repository/prescripcion-repository';
import { PrescripcionesDelete } from './types/typeDelele';

@Injectable()
export class PrescripcionesDeleteService implements PrescripcionesDelete {
  constructor(
    @Inject(PRESCRIPCIONE_REPOSITORY)
    private readonly prescripcionesRepository: PrescripcionesRepository,
  ) {}
  async delete(id: string): Promise<void> {
    await this.prescripcionesRepository.delete(id);
  }
}
