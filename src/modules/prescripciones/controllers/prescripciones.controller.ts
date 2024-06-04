import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreatePrescripcioneDto } from '../dto/create-prescripcione.dto';
import { PrescripcionesService } from '../services/prescripciones.service';

@Controller('prescripciones')
export class PrescripcionesController {
  constructor(private readonly prescripcionesService: PrescripcionesService) {}

  @Post(':id')
  create(
    @Body() createPrescripcioneDto: CreatePrescripcioneDto,
    @Param('id') id: string,
  ) {
    return this.prescripcionesService.create(createPrescripcioneDto, id);
  }
}
