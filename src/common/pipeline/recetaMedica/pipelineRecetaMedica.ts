import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const buildLookupStageRecetaMedica: PipelineStage[] =
  AggregateQuery.buildLookupStage('recetas', 'recetaMedica');

export const unwindRecetaMedicaStage: PipelineStage = {
  $unwind: { path: '$recetaMedica', preserveNullAndEmptyArrays: true },
};

export const lookRecetaMedica: PipelineStage = {
  $lookup: {
    from: 'medicos', // Nombre de la colección de médicos
    localField: 'recetaMedica.medico',
    foreignField: '_id',
    as: 'medicoReceta',
    pipeline: [
      { $project: { name: 1, apellidos: 1 } }, // Seleccionar solo los campos name y apellidos
    ],
  },
};

export const addFieldsRecetaMedica: PipelineStage = {
  $addFields: {
    'recetaMedica.medico': {
      $arrayElemAt: ['$medicoReceta', 0],
    },
  },
};

export const groupRecetaMedica: PipelineStage = {
  $group: {
    _id: '$_id',
    dni: { $first: '$dni' },
    name: { $first: '$name' },
    apellidos: { $first: '$apellidos' },
    genero: { $first: '$genero' },
    fechaNacimiento: { $first: '$fechaNacimiento' },
    url_perfil: { $first: '$url_perfil' },
    departamento: { $first: '$departamento' },
    distrito: { $first: '$distrito' },
    ciudad: { $first: '$ciudad' },
    direccion: { $first: '$direccion' },
    email: { $first: '$email' },
    celular: { $first: '$celular' },
    etiquetas: { $first: '$etiquetas' },
    nota: { $first: '$nota' },
    alergia: { $first: '$alergia' },
    apoderado: { $first: '$apoderado' },
    mayorEdad: { $first: '$mayorEdad' },
    historialClinico: { $first: '$historialClinico' },
    detallesServicios: { $first: '$detallesServicios' },
    detalles: { $first: '$detalles' },

    citas: { $first: '$citas' },
    recetaMedica: { $push: '$recetaMedica' },
    fechaRegistro: { $first: '$fechaRegistro' },
    horaRegistro: { $first: '$horaRegistro' },
    prescripciones: { $first: '$prescripciones' },
    archivos: { $first: '$archivos' },
    fuenteCaptacion: { $first: '$fuenteCaptacion' },
  },
};
