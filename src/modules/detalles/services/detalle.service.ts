import { Injectable } from '@nestjs/common';
import { DetallesFindService } from './find/find.service';
import { Detalle } from '../entities/detalle.entity';

@Injectable()
export class DetalleService {
  constructor(private readonly detallesFindService: DetallesFindService) {}

  async getServicesReportForDate(
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<Detalle[]> {
    return this.detallesFindService.getServicesReportForDate(
      fechaInicio,
      fechaFin,
    );
  }
}
