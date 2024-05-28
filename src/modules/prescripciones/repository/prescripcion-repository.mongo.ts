import { Injectable } from '@nestjs/common';
import { PrescripcionesRepository } from './prescripcion-repository';
import { Prescripciones } from '../entities/prescripcione.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { CreatePrescripcioneDto } from '../dto/create-prescripcione.dto';

@Injectable()
export class PrescripcionesRepositoryMongo implements PrescripcionesRepository {
  constructor(
    @InjectModel(Prescripciones.name)
    private readonly prescripcionesModel: Model<Prescripciones>,
  ) {}
  async create(
    createPrescripcioneDto: CreatePrescripcioneDto,
  ): Promise<Prescripciones> {
    return await this.prescripcionesModel.create(createPrescripcioneDto);
  }
  async aggregateGeneric<T>(pipeline: PipelineStage[]): Promise<T> {
    const result = await this.prescripcionesModel.aggregate<T>(pipeline);
    return result as T;
  }

  async findAll(): Promise<Prescripciones[]> {
    return await this.prescripcionesModel.find();
  }
}
