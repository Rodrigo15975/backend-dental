import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEstadoCitaDto } from '../dto/create-estado-cita.dto';
import { EstadoCitaService } from '../services/estado-cita.service';

@Controller('estado-cita')
export class EstadoCitaController {
  constructor(private readonly estadoCitaService: EstadoCitaService) {}

  @Post()
  create(@Body() createEstadoCitaDto: CreateEstadoCitaDto) {
    return this.estadoCitaService.create(createEstadoCitaDto);
  }

  @Get()
  findAll() {
    return this.estadoCitaService.findAll();
  }
}
