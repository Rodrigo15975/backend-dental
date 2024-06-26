// import { PipelineStage } from 'mongoose';
// import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

// export const buildLookupStageDetalles: PipelineStage[] =
//   AggregateQuery.buildLookupStage('detalles', 'detalles');

// export const unwindDetallesState: PipelineStage = {
//   $unwind: { path: '$detalles', preserveNullAndEmptyArrays: true },
// };

// export const lookUpDetallesMedicos: PipelineStage = {
//   $lookup: {
//     from: 'medicos', // Nombre de la colección de médicos
//     localField: 'detalles.medico',
//     foreignField: '_id',
//     as: 'detallesMedico',
//     pipeline: [
//       { $project: { name: 1, apellidos: 1 } }, // Seleccionar solo los campos name y apellidos
//     ],
//   },
// };

// export const lookUpDetallesEstadoTratamiento: PipelineStage = {
//   $lookup: {
//     from: 'estado-servicio', // Nombre de la colección de médicos
//     localField: 'detalles.estado_tratamiento',
//     foreignField: '_id',
//     as: 'detallesTratamiento',
//     pipeline: [
//       { $project: { estado_tratamiento: 1 } }, // Seleccionar solo los campos name y apellidos
//     ],
//   },
// };

// export const addFieldsDetallesMedicos: PipelineStage = {
//   $addFields: {
//     'detalles.medico': {
//       $arrayElemAt: ['$detallesMedico', 0],
//     },
//   },
// };

// export const addFieldsDetallesEstadoTratamiento: PipelineStage = {
//   $addFields: {
//     'detalles.estado_tratamiento': {
//       $arrayElemAt: ['$detallesTratamiento', 0],
//     },
//   },
// };

// export const groupDetalles: PipelineStage = {
//   $group: {
//     _id: '$_id',
//     dni: { $first: '$dni' },
//     name: { $first: '$name' },
//     apellidos: { $first: '$apellidos' },
//     genero: { $first: '$genero' },
//     fechaNacimiento: { $first: '$fechaNacimiento' },
//     url_perfil: { $first: '$url_perfil' },
//     departamento: { $first: '$departamento' },
//     distrito: { $first: '$distrito' },
//     ciudad: { $first: '$ciudad' },
//     direccion: { $first: '$direccion' },
//     email: { $first: '$email' },
//     celular: { $first: '$celular' },
//     etiquetas: { $first: '$etiquetas' },
//     nota: { $first: '$nota' },
//     alergia: { $first: '$alergia' },
//     apoderado: { $first: '$apoderado' },
//     mayorEdad: { $first: '$mayorEdad' },
//     historialClinico: { $first: '$historialClinico' },
//     detallesServicios: { $first: '$detallesServicios' },
//     detalles: { $push: '$detalles' },

//     citas: { $first: '$citas' },
//     recetaMedica: { $first: '$recetaMedica' },
//     fechaRegistro: { $first: '$fechaRegistro' },
//     horaRegistro: { $first: '$horaRegistro' },
//     prescripciones: { $first: '$prescripciones' },
//     archivos: { $first: '$archivos' },
//     fuenteCaptacion: { $first: '$fuenteCaptacion' },
//   },
// };
