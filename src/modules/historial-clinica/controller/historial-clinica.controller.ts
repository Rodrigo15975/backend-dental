import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateHistorialClinicaDto } from '../dto/create-historial-clinica.dto';
import { HistorialClinicaService } from '../services/historial-clinica.service';

@Controller('historial-clinica')
export class HistorialClinicaController {
  constructor(
    private readonly historialClinicaService: HistorialClinicaService,
  ) {}

  @Post(':id')
  create(
    @Body() createHistorialClinicaDto: CreateHistorialClinicaDto,
    @Param('id') id: string,
  ) {
    return this.historialClinicaService.create(createHistorialClinicaDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialClinicaService.remove(id);
  }
}
