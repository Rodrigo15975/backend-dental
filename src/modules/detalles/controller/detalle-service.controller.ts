import { Controller, Get, Query } from '@nestjs/common';
import { DetalleService } from '../services/detalle.service';

@Controller('detalle')
export class DetalleServicioController {
  constructor(private readonly detalleService: DetalleService) {}

  @Get('reporte')
  find(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59, 999);

    return this.detalleService.getServicesReportForDate(inicio, fin);
  }
}
