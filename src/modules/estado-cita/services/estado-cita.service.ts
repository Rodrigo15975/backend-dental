import { Injectable } from '@nestjs/common';
import { CreateEstadoCitaDto } from '../dto/create-estado-cita.dto';
import { EstadoCitaCreateService } from './create/create.service';
import { EstadoCitaFindService } from './find/find.service';

@Injectable()
export class EstadoCitaService {
  constructor(
    private readonly estadoCitaCreateService: EstadoCitaCreateService,
    private readonly estadoCitaFindService: EstadoCitaFindService,
  ) {}
  async create(createEstadoCitaDto: CreateEstadoCitaDto) {
    return await this.estadoCitaCreateService.create(createEstadoCitaDto);
  }

  async findAll() {
    return await this.estadoCitaFindService.findAll();
  }
}
