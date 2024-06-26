// import { PipelineStage } from 'mongoose';
// import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

// export const buildLookupStageCitas: PipelineStage[] =
//   AggregateQuery.buildLookupStage('citas', 'citas');

// export const unwindDetallesCitas: PipelineStage = {
//   $unwind: { path: '$citas', preserveNullAndEmptyArrays: true },
// };

// export const lookUpCitasMedicos: PipelineStage = {
//   $lookup: {
//     from: 'medicos', // Nombre de la colección de médicos
//     localField: 'citas.medico',
//     foreignField: '_id',
//     as: 'citasMedico',
//     pipeline: [
//       { $project: { name: 1, apellidos: 1 } }, // Seleccionar solo los campos name y apellidos
//     ],
//   },
// };

// export const lookUpDetallesCitaEstado: PipelineStage = {
//   $lookup: {
//     from: 'estado-cita', // Nombre de la colección de médicos
//     localField: 'citas.estado',
//     foreignField: '_id',
//     as: 'citaEstado',
//     pipeline: [
//       { $project: { estado: 1, bg: 1 } }, // Seleccionar solo los campos name y apellidos
//     ],
//   },
// };

// export const addFieldsDetallesCita: PipelineStage = {
//   $addFields: {
//     'citas.medico': {
//       $arrayElemAt: ['$citasMedico', 0],
//     },
//   },
// };

// export const addFieldsDetallesCitaEstado: PipelineStage = {
//   $addFields: {
//     'citas.estado': {
//       $arrayElemAt: ['$citaEstado', 0],
//     },
//   },
// };

// export const groupCitas: PipelineStage = {
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
//     detalles: { $first: '$detalles' },
//     citas: { $push: '$citas' },
//     prescripciones: { $first: '$prescripciones' },
//     recetaMedica: { $first: '$recetaMedica' },
//     fechaRegistro: { $first: '$fechaRegistro' },
//     horaRegistro: { $first: '$horaRegistro' },
//     archivos: { $first: '$archivos' },
//     fuenteCaptacion: { $first: '$fuenteCaptacion' },
//   },
// };
