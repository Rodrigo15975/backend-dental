import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const buildLookupStageRecetaMedica: PipelineStage[] =
  AggregateQuery.buildLookupStage('recetaMedica', 'recetaMedica');
