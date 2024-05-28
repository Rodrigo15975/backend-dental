import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateNotaDto } from '../dto/create-nota.dto';
import { UpdateNotaDto } from '../dto/update-nota.dto';
import { NotaService } from '../services/nota.service';

@Controller('nota')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  // Quitar est postp or que no ira igual de alergias
  @Post()
  create(@Body() createNotaDto: CreateNotaDto) {
    return this.notaService.create(createNotaDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotaDto: UpdateNotaDto) {
    return this.notaService.update(id, updateNotaDto);
  }
}
