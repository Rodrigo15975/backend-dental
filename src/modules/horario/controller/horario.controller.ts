import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateHorarioDto } from '../dto/create-horario.dto';
import { HorarioService } from '../services/horario.service';
import { UpdateHorarioDto } from '../dto/update-horario.dto';

@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post()
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horarioService.create(createHorarioDto);
  }

  @Get()
  findOne() {
    return this.horarioService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horarioService.update(id, updateHorarioDto);
  }
}
