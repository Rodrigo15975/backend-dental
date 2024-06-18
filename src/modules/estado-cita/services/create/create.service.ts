import { Inject, Injectable } from '@nestjs/common';
import { EstadoCitaCreate } from './types/typesCreate';
import { CreateEstadoCitaDto } from '../../dto/create-estado-cita.dto';
import {
  ESTADO_CITA_REPOSITORY,
  EstadoCitaRepository,
} from '../../repository/estado-cita-repository';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class EstadoCitaCreateService implements EstadoCitaCreate {
  constructor(
    @Inject(ESTADO_CITA_REPOSITORY)
    private readonly estadoCitaRepository: EstadoCitaRepository,
    private readonly handledErrors: HandleErrors,
  ) {}

  async create(data: CreateEstadoCitaDto): Promise<void> {
    await this.estadoCitaRepository.create(data);
    this.handledErrors.handleSendMessage('Estado de cita creado');
  }
}
