import { Injectable } from '@nestjs/common';
import { EstadoServicioRepository } from './estado-servicio-repository';
import { CreateEstadoServicioDto } from '../dto/create-estado-servicio.dto';
import { EstadoServicio } from '../entities/estado-servicio.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EstadoServicioRepositoryMongo implements EstadoServicioRepository {
  constructor(
    @InjectModel(EstadoServicio.name)
    private readonly estadoServicoModel: Model<EstadoServicio>,
  ) {}

  async create(
    createEstadoServicioDto: CreateEstadoServicioDto,
  ): Promise<EstadoServicio> {
    return await this.estadoServicoModel.create(createEstadoServicioDto);
  }
  async delete(id: string): Promise<void> {
    await this.estadoServicoModel.findByIdAndDelete(id);
  }
  async findAll(): Promise<EstadoServicio[]> {
    return await this.estadoServicoModel.find();
  }
  async findById(id: string): Promise<EstadoServicio> {
    return await this.estadoServicoModel.findById(id);
  }
}
