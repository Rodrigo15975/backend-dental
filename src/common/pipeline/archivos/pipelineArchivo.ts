// import { PipelineStage } from 'mongoose';
// import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

// export const buildLookupArchivos: PipelineStage[] =
//   AggregateQuery.buildLookupStage('archivos', 'archivos');

// export const unwindArchivosStage: PipelineStage = {
//   $unwind: { path: '$archivos', preserveNullAndEmptyArrays: true },
// };

// export const buildLookupArchivosMedicos: PipelineStage[] = [
//   {
//     $lookup: {
//       from: 'medicos', // Nombre de la colección de médicos
//       localField: 'archivos.medico',
//       foreignField: '_id',
//       as: 'medico',
//       pipeline: [
//         { $project: { name: 1, apellidos: 1 } }, // Seleccionar solo los campos name y apellidos
//       ],
//     },
//   },
// ];

// export const projectStArchivos: PipelineStage = {
//   $project: {
//     'archivos.createdAt': 0,
//     'archivos.updatedAt': 0,
//     'archivos.__v': 0,
//   },
// };
