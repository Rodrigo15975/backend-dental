import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const buildLookupStageHistorialClinico: PipelineStage[] =
  AggregateQuery.buildLookupStage('historial-clinica', 'historialClinico');

export const projectHistorialClinicoState: PipelineStage = {
  $project: {
    'historialClinico.updatedAt': 0,
    'historialClinico.createdAt': 0,
    'historialClinico.__v': 0,
  },
};
