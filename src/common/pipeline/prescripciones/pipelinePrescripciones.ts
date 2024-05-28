import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const buildLookupStagePrescripciones: PipelineStage[] =
  AggregateQuery.buildLookupStage('prescripciones', 'prescripciones');

// export const buildLookupStageMedicos: PipelineStage[] =
//   AggregateQuery.buildLookupStage('medicos', 'prescripciones.medico');

export const projectStatePrescripciones: PipelineStage = {
  $project: {
    'prescripciones.updatedAt': 0,
    'prescripciones.createdAt': 0,
    'prescripciones.__v': 0,
    // 'prescripciones._id': 1,
    // 'prescripciones.notaAdicional': 1,
    // 'prescripciones.responsabilidad': 1,
    // 'prescripciones.fechaPrescripcion': 1,
    // 'prescripciones.horaPrescripcion': 1,
    // 'prescripciones.medico.dni': 1,
    // 'prescripciones.medico.apellidos': 1,
    // 'prescripciones.medico.name': 1,
  },
};
