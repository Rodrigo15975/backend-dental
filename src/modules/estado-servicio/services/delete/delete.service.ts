import { Inject, Injectable } from '@nestjs/common';
import {
  ESTADO_SERVICIO_REPOSITORY,
  EstadoServicioRepository,
} from '../../repository/estado-servicio-repository';
import { EstadoServicioDelete } from './types/typesDelete';

@Injectable()
export class EstadoServicioDeleteService implements EstadoServicioDelete {
  constructor(
    @Inject(ESTADO_SERVICIO_REPOSITORY)
    private readonly estadoServicioRepository: EstadoServicioRepository,
  ) {}

  async delete(id: string): Promise<void> {
    await this.estadoServicioRepository.delete(id);
  }
}
