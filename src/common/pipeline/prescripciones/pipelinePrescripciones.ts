import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const buildLookupStagePrescripciones: PipelineStage[] =
  AggregateQuery.buildLookupStage('prescripciones', 'prescripciones');

export const unwindPrescripciones: PipelineStage = {
  $unwind: { path: '$prescripciones', preserveNullAndEmptyArrays: true },
};

export const lookUpPrescripcionesMedicos: PipelineStage = {
  $lookup: {
    from: 'medicos', // Nombre de la colección de médicos
    localField: 'prescripciones.medico',
    foreignField: '_id',
    as: 'medicoPrescripcion',
    pipeline: [
      { $project: { name: 1, apellidos: 1 } }, // Seleccionar solo los campos name y apellidos
    ],
  },
};
export const addFieldsPrescripcionesMedicos: PipelineStage = {
  $addFields: {
    'prescripciones.medico': {
      $arrayElemAt: ['$medicoPrescripcion', 0],
    },
  },
};

export const groupPrescripcionesMedicos: PipelineStage = {
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
    recetaMedica: { $first: '$recetaMedica' },
    fechaRegistro: { $first: '$fechaRegistro' },
    horaRegistro: { $first: '$horaRegistro' },
    prescripciones: { $push: '$prescripciones' },
    archivos: { $first: '$archivos' },
    fuenteCaptacion: { $first: '$fuenteCaptacion' },
  },
};

export const projectStatePrescripciones: PipelineStage = {
  $project: {
    'prescripciones.updatedAt': 0,
    'prescripciones.createdAt': 0,
    'prescripciones.__v': 0,
  },
};
