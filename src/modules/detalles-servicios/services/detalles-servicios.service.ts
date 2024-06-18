import { Injectable } from '@nestjs/common';
import {
  CreateDetallesServicioDtoMayor,
  CreateDetallesServicioDtoMenor,
  UpdateEstadoTratamientoo,
} from '../dto/create-detalles-servicio.dto';
import { DetallesServicioCreateService } from './create/create.service';
import { CreateTratamientoDto } from 'src/modules/detalles/dto/create-detalle.dto';
import { DetallesUpdateService } from 'src/modules/detalles/services/update/update.service';

@Injectable()
export class DetallesServiciosService {
  constructor(
    private readonly detallesServicioCreateService: DetallesServicioCreateService,
    private readonly detallesUpdateService: DetallesUpdateService,
  ) {}

  async createTratamiento(data: CreateTratamientoDto, id: string) {
    return await this.detallesServicioCreateService.createDetallesTratamiento(
      data,
      id,
    );
  }
  async updateEstadoTratamiento(
    updateEstadoTratamiento: UpdateEstadoTratamientoo,
  ) {
    return await this.detallesUpdateService.update(updateEstadoTratamiento);
  }

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
