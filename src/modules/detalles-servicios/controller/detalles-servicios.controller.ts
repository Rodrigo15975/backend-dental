import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CreateDetallesServicioDtoMayor,
  CreateDetallesServicioDtoMenor,
} from '../dto/create-detalles-servicio.dto';
import { DetallesServiciosService } from '../services/detalles-servicios.service';

@Controller('detalles-servicios')
export class DetallesServiciosController {
  constructor(
    private readonly detallesServiciosService: DetallesServiciosService,
  ) {}

  @Post('/paciente-mayor/:id')
  createServicioMayor(
    @Body() createDetallesServicioDtoMayor: CreateDetallesServicioDtoMayor,
    @Param('id') idPaciente: string,
  ) {
    return this.detallesServiciosService.createMayor(
      createDetallesServicioDtoMayor,
      idPaciente,
    );
  }
  @Post('/paciente-menor/:id')
  createServicioMenor(
    @Body() createDetallesServicioDtoMenor: CreateDetallesServicioDtoMenor,
    @Param('id') idPaciente: string,
  ) {
    return this.detallesServiciosService.createMenor(
      createDetallesServicioDtoMenor,
      idPaciente,
    );
  }
}
