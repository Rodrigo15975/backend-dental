// import { PipelineStage } from 'mongoose';
// import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

// export const buildLookUpStateNotas: PipelineStage[] =
//   AggregateQuery.buildLookupStage('notas', 'nota');

// export const projectStageNota: PipelineStage = {
//   $project: {
//     'nota.createdAt': 0,
//     'nota.updatedAt': 0,
//     'nota.__v': 0,
//   },
// };

// // Se descompone, si tiene datos, el array, si no tiene datos
// // lo desaparece importante***
// export const unwindNotasStage: PipelineStage = {
//   $unwind: { path: '$nota', preserveNullAndEmptyArrays: true },
// };
