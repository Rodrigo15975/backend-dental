import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const lookupAsistenciaStage: PipelineStage[] =
  AggregateQuery.buildLookupStage('asistencia', 'asistencia');
