import { Inject, Injectable } from '@nestjs/common';
import { EstadoServicioFind } from './types/typesFind';
import {
  ESTADO_SERVICIO_REPOSITORY,
  EstadoServicioRepository,
} from '../../repository/estado-servicio-repository';
import { EstadoServicio } from '../../entities/estado-servicio.entity';

@Injectable()
export class EstadoServicioFindService implements EstadoServicioFind {
  constructor(
    @Inject(ESTADO_SERVICIO_REPOSITORY)
    private readonly estadoServicioRepository: EstadoServicioRepository,
  ) {}

  async findAll(): Promise<EstadoServicio[]> {
    return await this.estadoServicioRepository.findAll();
  }
  async findById(id: string): Promise<EstadoServicio> {
    return await this.estadoServicioRepository.findById(id);
  }
}
