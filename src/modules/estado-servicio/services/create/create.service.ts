import { Inject, Injectable } from '@nestjs/common';
import { EstadoServicioCreate } from './types/typesCreate';
import { CreateEstadoServicioDto } from '../../dto/create-estado-servicio.dto';
import { EstadoServicio } from '../../entities/estado-servicio.entity';
import {
  ESTADO_SERVICIO_REPOSITORY,
  EstadoServicioRepository,
} from '../../repository/estado-servicio-repository';

@Injectable()
export class EstadoServicioCreateService implements EstadoServicioCreate {
  constructor(
    @Inject(ESTADO_SERVICIO_REPOSITORY)
    private readonly estadoServicioRepository: EstadoServicioRepository,
  ) {}
  async create(
    createEstadoServicioDto: CreateEstadoServicioDto,
  ): Promise<EstadoServicio> {
    return await this.estadoServicioRepository.create(createEstadoServicioDto);
  }
}
