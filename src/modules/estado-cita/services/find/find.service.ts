import { Inject, Injectable } from '@nestjs/common';
import { EstadoCita } from '../../entities/estado-cita.entity';
import {
  ESTADO_CITA_REPOSITORY,
  EstadoCitaRepository,
} from '../../repository/estado-cita-repository';
import { EstadoCitaFind } from './types/typesFind';
import { EstadoCitaIds } from 'src/common/constants/stados_cita_id';

@Injectable()
export class EstadoCitaFindService implements EstadoCitaFind {
  constructor(
    @Inject(ESTADO_CITA_REPOSITORY)
    private readonly estadoCitaRepository: EstadoCitaRepository,
  ) {}

  async findCitaReprogramada() {
    return await this.estadoCitaRepository.findById(EstadoCitaIds.REPROGRAMADA);
  }
  async findCitaConfirmada() {
    return await this.estadoCitaRepository.findById(EstadoCitaIds.CONFIRMADA);
  }
  async findCitaListaEspera() {
    return await this.estadoCitaRepository.findById(EstadoCitaIds.LISTA_ESPERA);
  }
  async findCitaListaSala() {
    return await this.estadoCitaRepository.findById(EstadoCitaIds.LISTA_SALA);
  }

  async findCitaAtendida() {
    return await this.estadoCitaRepository.findById(EstadoCitaIds.ATENDIDA);
  }

  async findCitaCancelada() {
    return await this.estadoCitaRepository.findById(EstadoCitaIds.CANCELADA);
  }
  async findAll(): Promise<EstadoCita[]> {
    return await this.estadoCitaRepository.findAll();
  }

  async findById(id: string): Promise<EstadoCita> {
    return await this.estadoCitaRepository.findById(id);
  }
}
