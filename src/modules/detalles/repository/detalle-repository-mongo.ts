import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDetallesDto } from '../dto/create-detalle.dto';
import { Detalle } from '../entities/detalle.entity';
import { DetalleRepository } from './detalle-repositor';

@Injectable()
export class DetalleRepositoryMongo implements DetalleRepository {
  constructor(
    @InjectModel(Detalle.name) private readonly modelDetalle: Model<Detalle>,
  ) {}
  async create(data: CreateDetallesDto): Promise<Detalle> {
    return await this.modelDetalle.create(data);
  }

  async delete(id: string): Promise<void> {
    return await this.modelDetalle.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<Detalle> {
    return await this.modelDetalle.findById(id);
  }
}
