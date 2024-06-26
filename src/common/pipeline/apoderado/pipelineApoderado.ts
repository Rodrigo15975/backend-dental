// import { PipelineStage } from 'mongoose';
// import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

// export const buildLookupApoderadoState: PipelineStage[] =
//   AggregateQuery.buildLookupStage('apoderado', 'apoderado');

// // va " con apoderado.created"
// // por que si no puedes con el .
// // afecta todo el documento importante
// export const projectStageApoderado: PipelineStage = {
//   $project: {
//     'apoderado.createdAt': 0,
//     'apoderado.updatedAt': 0,
//     'apoderado.__v': 0,
//   },
// };
