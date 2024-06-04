import { Inject, Injectable } from '@nestjs/common';
import { DetallesServiciosDelete } from './types/typesDelete';
import {
  DETALLES_SERVICIO_REPOSITORY,
  DetallesServiciosRepository,
} from '../../repository/detalles-servicios-repository';

@Injectable()
export class DetallesServicioDeleteService implements DetallesServiciosDelete {
  constructor(
    @Inject(DETALLES_SERVICIO_REPOSITORY)
    private readonly detallesServicioRepository: DetallesServiciosRepository,
  ) {}

  async delete(id: string) {
    await this.detallesServicioRepository.delete(id);
  }
}
