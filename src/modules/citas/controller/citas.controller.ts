import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCitaDto } from '../dto/create-cita.dto';
import { UpdateCitaDto, UpdateStatusCitaDto } from '../dto/update-cita.dto';
import { CitasService } from '../services/citas.service';

@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.create(createCitaDto);
  }

  @Get()
  findAll() {
    return this.citasService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(id, updateCitaDto);
  }
  @Patch('/change-date/:id')
  updateChangeDate(
    @Param('id') id: string,
    @Body() updateCitaDto: UpdateCitaDto,
  ) {
    return this.citasService.updateChangeDate(id, updateCitaDto);
  }

  @Patch('/confirmada/status')
  updateStatusConfirmadaCita(@Body() updateCitaStatusDto: UpdateStatusCitaDto) {
    return this.citasService.updateCitaConfirmada(updateCitaStatusDto);
  }

  @Patch('/espera/status')
  updateStatusListaEspera(@Body() updateCitaStatusDto: UpdateStatusCitaDto) {
    return this.citasService.updateCitaListaEspera(updateCitaStatusDto);
  }
  @Patch('/cancelar/status')
  updateStatusCancelar(@Body() updateCitaStatusDto: UpdateStatusCitaDto) {
    return this.citasService.updateCitaCancelar(updateCitaStatusDto);
  }
  @Patch('/sala/status')
  updateStatusSala(@Body() updateCitaStatusDto: UpdateStatusCitaDto) {
    return this.citasService.updateCitaSala(updateCitaStatusDto);
  }
  @Patch('/atendida/status')
  updateStatusAtendida(@Body() updateCitaStatusDto: UpdateStatusCitaDto) {
    return this.citasService.updateCitaAtendida(updateCitaStatusDto);
  }

  @Delete(':idCita/:idPaciente')
  delete(
    @Param('idCita') idCita: string,
    @Param('idPaciente') idPaciente: string,
  ) {
    return this.citasService.deleteCita(idCita, idPaciente);
  }
}
