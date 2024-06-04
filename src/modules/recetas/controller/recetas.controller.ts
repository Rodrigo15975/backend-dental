import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateRecetaDto } from '../dto/create-receta.dto';
import { RecetasService } from '../services/recetas.service';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetasService: RecetasService) {}

  @Post(':id')
  create(@Body() createRecetaDto: CreateRecetaDto, @Param('id') id: string) {
    return this.recetasService.create(createRecetaDto, id);
  }
}
