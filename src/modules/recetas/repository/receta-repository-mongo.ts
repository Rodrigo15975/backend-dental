import { Injectable } from '@nestjs/common';
import { RecetaRepository } from './receta-repository';
import { InjectModel } from '@nestjs/mongoose';
import { Receta } from '../entities/receta.entity';
import { Model } from 'mongoose';
import { CreateRecetaDto } from '../dto/create-receta.dto';

@Injectable()
export class RecetaRepositoryMongo implements RecetaRepository {
  constructor(
    @InjectModel(Receta.name) private readonly modelReceta: Model<Receta>,
  ) {}

  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    return await this.modelReceta.create(createRecetaDto);
  }
}
