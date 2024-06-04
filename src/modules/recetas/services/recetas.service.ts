import { Injectable } from '@nestjs/common';
import { CreateRecetaDto } from '../dto/create-receta.dto';
import { RecetaCreateService } from './create/create.service';

@Injectable()
export class RecetasService {
  constructor(private readonly recetaCreateServices: RecetaCreateService) {}
  async create(createRecetaDto: CreateRecetaDto, id: string) {
    return await this.recetaCreateServices.create(createRecetaDto, id);
  }
}
