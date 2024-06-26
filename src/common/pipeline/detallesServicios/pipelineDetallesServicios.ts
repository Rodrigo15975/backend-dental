// import { PipelineStage } from 'mongoose';
// import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

// export const buildLookupStageDetallesServicios: PipelineStage[] =
//   AggregateQuery.buildLookupStage('detalles-servicios', 'detallesServicios');

// export const unwindDetallesServiciosState: PipelineStage = {
//   $unwind: { path: '$detallesServicios', preserveNullAndEmptyArrays: true },
// };

// // export const lookUpDetalles: PipelineStage = {
// //   $lookup: {
// //     from: 'detalles', // Nombre de la colección de médicos
// //     localField: 'detallesServicios.detalles_servicios',
// //     foreignField: '_id',
// //     as: 'detalles_servicios',
// //     pipeline: [
// //       {
// //         $project: {
// //           estado_tratamiento: 1,
// //           medico: 1,
// //           servicio: 1,
// //           costo_servicio: 1,
// //         },
// //       }, // Seleccionar solo los campos name y apellidos
// //     ],
// //   },
// // };

// // convierte el ifNull, en array, el 2 parametro en array []
// // export const addFieldsDetalles: PipelineStage = {
// //   $addFields: {
// //     'detallesServicios.detalles_servicios': {
// //       $ifNull: ['$detalles_servicios', []],
// //     },
// //   },
// // };

// export const groupDetallesServicios: PipelineStage = {
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
//     detallesServicios: { $push: '$detallesServicios' },

//     detalles: { $first: '$detalles' },

//     citas: { $first: '$citas' },
//     recetaMedica: { $first: '$recetaMedica' },
//     fechaRegistro: { $first: '$fechaRegistro' },
//     horaRegistro: { $first: '$horaRegistro' },
//     prescripciones: { $first: '$prescripciones' },
//     archivos: { $first: '$archivos' },
//     fuenteCaptacion: { $first: '$fuenteCaptacion' },
//   },
// };
