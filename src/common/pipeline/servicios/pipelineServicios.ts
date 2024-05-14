import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const lookupServiciosStage: PipelineStage[] =
  AggregateQuery.buildLookupStage('servicios', 'servicios');
