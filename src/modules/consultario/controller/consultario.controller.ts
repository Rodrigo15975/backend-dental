import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultarioService } from '../services/consultario.service';
import { CreateConsultarioDto } from '../dto/create-consultario.dto';
import { UpdateConsultarioDto } from '../dto/update-consultario.dto';

@Controller('consultorio')
export class ConsultarioController {
  constructor(private readonly consultarioService: ConsultarioService) {}

  @Post()
  create(@Body() createConsultarioDto: CreateConsultarioDto) {
    return this.consultarioService.create(createConsultarioDto);
  }
  @Get()
  findOne() {
    return this.consultarioService.find();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultarioDto: UpdateConsultarioDto,
  ) {
    return this.consultarioService.update(id, updateConsultarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultarioService.remove(id);
  }
}
