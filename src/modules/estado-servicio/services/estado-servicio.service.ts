import { Injectable } from '@nestjs/common';
import { CreateEstadoServicioDto } from '../dto/create-estado-servicio.dto';
import { EstadoServicioCreateService } from './create/create.service';
import { EstadoServicioFindService } from './find/find.service';

@Injectable()
export class EstadoServicioService {
  constructor(
    private readonly estadoServicioCreateServicio: EstadoServicioCreateService,
    private readonly estadoServicioFindServicio: EstadoServicioFindService,
  ) {}

  async create(createEstadoServicioDto: CreateEstadoServicioDto) {
    return await this.estadoServicioCreateServicio.create(
      createEstadoServicioDto,
    );
  }
  async findAll() {
    return await this.estadoServicioFindServicio.findAll();
  }
}
