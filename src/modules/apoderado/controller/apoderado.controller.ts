import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApoderadoService } from '../services/apoderado.service';
import { CreateApoderadoDto } from '../dto/create-apoderado.dto';
import { UpdateApoderadoDto } from '../dto/update-apoderado.dto';

@Controller('apoderado')
export class ApoderadoController {
  constructor(private readonly apoderadoService: ApoderadoService) {}

  @Post()
  create(@Body() createApoderadoDto: CreateApoderadoDto) {
    return this.apoderadoService.create(createApoderadoDto);
  }
  @Patch()
  update(@Body() createApoderadoDto: UpdateApoderadoDto) {
    return this.apoderadoService.update(createApoderadoDto);
  }

  @Get(':dni')
  findOne(@Param('dni') dni: string) {
    return this.apoderadoService.findByDni(dni);
  }
}
