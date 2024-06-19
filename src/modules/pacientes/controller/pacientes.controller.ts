import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreatePacienteDto,
  CreatePacienteMenorDto,
} from '../dto/create-paciente.dto';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';
import { PacientesService } from '../services/pacientes.service';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Post('/menor')
  createPacienteMenor(@Body() createPacienteDto: CreatePacienteMenorDto) {
    return this.pacientesService.createPacienteMenor(createPacienteDto);
  }

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get('/destacado')
  findPacienteTop() {
    return this.pacientesService.findPacienteTop();
  }

  @Get('stadisticasPacientesNuevos')
  findForMounthStatistics() {
    return this.pacientesService.findForMounthStatistics();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.pacientesService.findById(id);
  }

  @Get('dni/:dni')
  getFindByDni(@Param('dni') dni: string) {
    return this.pacientesService.findByDni(dni);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(id);
  }
  @Delete('/menor/:id')
  removeMenor(@Param('id') id: string) {
    return this.pacientesService.removeMenor(id);
  }
}
