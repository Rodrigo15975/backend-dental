import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateDetallesServicioDtoMayor,
  CreateDetallesServicioDtoMenor,
  CreateTratamientoDetallesServicioDto,
} from '../dto/create-detalles-servicio.dto';
import { DetallesServicio } from '../entities/detalles-servicio.entity';
import { DetallesServiciosRepository } from './detalles-servicios-repository';

@Injectable()
export class DetallesServiciosRepositoryMongo
  implements DetallesServiciosRepository
{
  constructor(
    @InjectModel(DetallesServicio.name)
    private readonly modelDetalles: Model<DetallesServicio>,
  ) {}
  async delete(id: string): Promise<void> {
    await this.modelDetalles.findByIdAndDelete(id);
  }

  async createDetallesPacienteMayor(
    data: CreateDetallesServicioDtoMayor,
  ): Promise<DetallesServicio> {
    return await this.modelDetalles.create(data);
  }

  async createDetallesPacienteMenor(
    data: CreateDetallesServicioDtoMenor,
  ): Promise<DetallesServicio> {
    return await this.modelDetalles.create(data);
  }

  async createTratamientoDetallesServicio(
    data: CreateTratamientoDetallesServicioDto,
  ): Promise<DetallesServicio> {
    return await this.modelDetalles.create(data);
  }
}
