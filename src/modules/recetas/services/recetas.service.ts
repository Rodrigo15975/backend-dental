import { Injectable } from '@nestjs/common';
import { UpdateRecetaDto } from '../dto/update-receta.dto';
import { CreateRecetaDto } from '../dto/create-receta.dto';
import { RecetaCreateService } from './create/create.service';

@Injectable()
export class RecetasService {
  constructor(private readonly recetaCreateServices: RecetaCreateService) {}
  async create(createRecetaDto: CreateRecetaDto) {
    return await this.recetaCreateServices.create(createRecetaDto);
  }

  findAll() {
    return `This action returns all recetas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receta`;
  }
  // ver si va estas funciones o no
  update(id: number, updateRecetaDto: UpdateRecetaDto) {
    return `This action updates a #${id} receta ${updateRecetaDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} receta`;
  }
}
