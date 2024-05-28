import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Etiqueta } from '../entities/etiqueta.entity';
import { Model } from 'mongoose';
import { EtiquetaRepository } from './etiqueta-repository';
import { CreateEtiquetaDto } from '../dto/create-etiqueta.dto';

@Injectable()
export class EtiquetaRepositoryMongo implements EtiquetaRepository {
  constructor(
    @InjectModel(Etiqueta.name) private readonly modelEtiqueta: Model<Etiqueta>,
  ) {}

  async create(createEtiquetaDto: CreateEtiquetaDto): Promise<Etiqueta> {
    return await this.modelEtiqueta.create(createEtiquetaDto);
  }
  async remove(id: string): Promise<Etiqueta> {
    return await this.modelEtiqueta.findByIdAndDelete(id);
  }
  async findById(id: string): Promise<Etiqueta> {
    return await this.modelEtiqueta.findById(id);
  }

  async findAll(): Promise<Etiqueta[]> {
    return await this.modelEtiqueta
      .find()
      .select(['etiqueta', '_id', 'bgColor']);
  }
}
