import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EstadoCita } from '../entities/estado-cita.entity';
import { Model } from 'mongoose';
import { EstadoCitaRepository } from './estado-cita-repository';
import { CreateEstadoCitaDto } from '../dto/create-estado-cita.dto';

@Injectable()
export class EstadoCitaRepositoryMongo implements EstadoCitaRepository {
  constructor(
    @InjectModel(EstadoCita.name)
    private readonly modelEstadoCita: Model<EstadoCita>,
  ) {}

  async create(data: CreateEstadoCitaDto): Promise<EstadoCita> {
    return await this.modelEstadoCita.create(data);
  }

  async findAll(): Promise<EstadoCita[]> {
    return await this.modelEstadoCita.find();
  }
  async findById(id: string): Promise<EstadoCita> {
    return await this.modelEstadoCita.findById(id);
  }
}
