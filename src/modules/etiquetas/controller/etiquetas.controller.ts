import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  AsignarEtiquetas,
  CreateEtiquetaDto,
} from '../dto/create-etiqueta.dto';
import { EtiquetasService } from '../services/etiquetas.service';
@Controller('etiquetas')
export class EtiquetasController {
  constructor(private readonly etiquetasService: EtiquetasService) {}

  @Post()
  create(@Body() createEtiquetaDto: CreateEtiquetaDto) {
    return this.etiquetasService.create(createEtiquetaDto);
  }
  @Post('/asignar')
  asignarEtiquetas(@Body() asignarEtiquetaDto: AsignarEtiquetas) {
    return this.etiquetasService.asignarEtiqueta(asignarEtiquetaDto);
  }

  @Get()
  findAll() {
    return this.etiquetasService.findAll();
  }

  @Delete(':id/:idPaciente')
  remove(@Param('id') id: string, @Param('idPaciente') idPaciente: string) {
    return this.etiquetasService.remove(id, idPaciente);
  }
}
