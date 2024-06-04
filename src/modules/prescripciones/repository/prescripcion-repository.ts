import { PipelineStage } from 'mongoose';
import { CreatePrescripcioneDto } from '../dto/create-prescripcione.dto';
import { Prescripciones } from '../entities/prescripcione.entity';

export const PRESCRIPCIONE_REPOSITORY = 'PrescripcioneRepository';

export interface PrescripcionesRepository {
  create(
    createPrescripcioneDto: CreatePrescripcioneDto,
  ): Promise<Prescripciones>;
  findAll(): Promise<Prescripciones[]>;
  delete(id: string): Promise<void>;
  aggregateGeneric<T>(pipeline: PipelineStage[]): Promise<T>;
}
