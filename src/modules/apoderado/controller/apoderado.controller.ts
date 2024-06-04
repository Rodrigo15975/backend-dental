import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApoderadoService } from '../services/apoderado.service';
import { CreateApoderadoDto } from '../dto/create-apoderado.dto';

@Controller('apoderado')
export class ApoderadoController {
  constructor(private readonly apoderadoService: ApoderadoService) {}

  @Post()
  create(@Body() createApoderadoDto: CreateApoderadoDto) {
    return this.apoderadoService.create(createApoderadoDto);
  }

  @Get(':dni')
  findOne(@Param('dni') dni: string) {
    return this.apoderadoService.findByDni(dni);
  }
}
