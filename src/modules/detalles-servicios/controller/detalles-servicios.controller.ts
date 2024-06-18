import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateTratamientoDto } from 'src/modules/detalles/dto/create-detalle.dto';
import {
  CreateDetallesServicioDtoMayor,
  CreateDetallesServicioDtoMenor,
  UpdateEstadoTratamientoo,
} from '../dto/create-detalles-servicio.dto';
import { DetallesServiciosService } from '../services/detalles-servicios.service';
@Controller('detalles-servicios')
export class DetallesServiciosController {
  constructor(
    private readonly detallesServiciosService: DetallesServiciosService,
  ) {}

  @Post('/tratamiento/:id')
  createServicioTratamiento(
    @Body() createTratamientoDto: CreateTratamientoDto,
    @Param('id') idPaciente: string,
  ) {
    return this.detallesServiciosService.createTratamiento(
      createTratamientoDto,
      idPaciente,
    );
  }

  @Patch('/tratamiento')
  updateServicioMayor(
    @Body()
    updateEstadoTratamiento: UpdateEstadoTratamientoo,
  ) {
    return this.detallesServiciosService.updateEstadoTratamiento(
      updateEstadoTratamiento,
    );
  }

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
