// import { PipelineStage } from 'mongoose';
// import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

// export const buildLookupStateAlergias: PipelineStage[] =
//   AggregateQuery.buildLookupStage('alergias', 'alergia');

// // Se descompone, si tiene datos, el array, si no tiene datos
// // lo desaparece importante***
// export const unwindAlergiasStage: PipelineStage = {
//   $unwind: { path: '$alergia', preserveNullAndEmptyArrays: true },
// };

// export const projectAlergiasState: PipelineStage = {
//   $project: {
//     'alergia.createdAt': 0,
//     'alergia.updatedAt': 0,
//     'alergia.__v': 0,
//   },
// };
