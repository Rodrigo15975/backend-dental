import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateAlergiaDto } from '../dto/create-alergia.dto';
import { AlergiasService } from '../services/alergias.service';
import { UpdateAlergiaDto } from '../dto/update-alergia.dto';

@Controller('alergias')
export class AlergiasController {
  constructor(private readonly alergiasService: AlergiasService) {}

  // Esto no ira 
  @Post()
  create(@Body() createAlergiaDto: CreateAlergiaDto) {
    return this.alergiasService.create(createAlergiaDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlergiaDto: UpdateAlergiaDto) {
    return this.alergiasService.update(id, updateAlergiaDto);
  }
}
