import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddNewServicesForMedicoWithDni } from 'src/modules/servicios/dto/create-servicio.dto';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { MedicosService } from '../services/medicos.service';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDto);
  }

  @Post('/create-services/:dni')
  asignarServices(
    @Body() servicios: AddNewServicesForMedicoWithDni,
    @Param('dni') dni: string,
  ) {
    return this.medicosService.addNewServicesForMedicoWithDni(servicios, dni);
  }

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }
  @Get(':id')
  findByMedico(@Param('id') id: string) {
    return this.medicosService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(id, updateMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicosService.remove(id);
  }
}
