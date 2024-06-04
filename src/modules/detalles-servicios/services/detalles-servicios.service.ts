import { Injectable } from '@nestjs/common';
import {
  CreateDetallesServicioDtoMayor,
  CreateDetallesServicioDtoMenor,
} from '../dto/create-detalles-servicio.dto';
import { DetallesServicioCreateService } from './create/create.service';

@Injectable()
export class DetallesServiciosService {
  constructor(
    private readonly detallesServicioCreateService: DetallesServicioCreateService,
  ) {}
  async createMayor(data: CreateDetallesServicioDtoMayor, id: string) {
    return await this.detallesServicioCreateService.createDetallesPacienteMayor(
      data,
      id,
    );
  }
  async createMenor(data: CreateDetallesServicioDtoMenor, id: string) {
    return this.detallesServicioCreateService.createDetallesPacienteMenor(
      data,
      id,
    );
  }
}
