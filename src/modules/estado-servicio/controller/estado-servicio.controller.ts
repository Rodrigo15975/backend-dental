import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEstadoServicioDto } from '../dto/create-estado-servicio.dto';
import { EstadoServicioService } from '../services/estado-servicio.service';

@Controller('estado-servicio')
export class EstadoServicioController {
  constructor(private readonly estadoServicioService: EstadoServicioService) {}

  @Post()
  create(@Body() createEstadoServicioDto: CreateEstadoServicioDto) {
    return this.estadoServicioService.create(createEstadoServicioDto);
  }

  @Get()
  findAll() {
    return this.estadoServicioService.findAll();
  }
}
