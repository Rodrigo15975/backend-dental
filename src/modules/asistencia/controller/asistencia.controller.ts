import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateAsistenciaDto } from '../dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from '../dto/update-asistencia.dto';
import { AsistenciaService } from '../services/asistencia.service';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post(':idMedico')
  create(
    @Param('idMedico') idMedico: string,
    @Body() createAsistenciaDto: CreateAsistenciaDto,
  ) {
    return this.asistenciaService.create(createAsistenciaDto, idMedico);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAsistenciaDto: UpdateAsistenciaDto,
  ) {
    return this.asistenciaService.update(id, updateAsistenciaDto);
  }
}
