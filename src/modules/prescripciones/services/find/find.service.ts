import { Inject, Injectable } from '@nestjs/common';
import { Prescripciones } from '../../entities/prescripcione.entity';
import {
  PRESCRIPCIONE_REPOSITORY,
  PrescripcionesRepository,
} from '../../repository/prescripcion-repository';
import { PrescripcionesFind } from './types/typeFind';
import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';
import { projectStatePrescripciones } from 'src/common/pipeline/prescripciones/pipelinePrescripciones';

@Injectable()
export class PrescripcionesFindService implements PrescripcionesFind {
  constructor(
    @Inject(PRESCRIPCIONE_REPOSITORY)
    private readonly prescripcionesRepository: PrescripcionesRepository,
  ) {}

  async findAll(): Promise<Prescripciones[]> {
    const pipeline: PipelineStage[] = AggregateQuery.pipeline(
      ...AggregateQuery.buildLookupStage('medicos', 'medico'),
      projectStatePrescripciones,
      {
        $unwind: '$medico',
      },
    );
    const medicos =
      await this.prescripcionesRepository.aggregateGeneric<Prescripciones[]>(
        pipeline,
      );
    return medicos;
  }
}
