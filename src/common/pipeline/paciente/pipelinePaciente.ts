import { PipelineStage } from 'mongoose';

export const projectStagePaciente: PipelineStage = {
  $project: {
    // Quita todo los valores que no necesito
    'prescripciones.createdAt': 0,
    'prescripciones.updatedAt': 0,
    'prescripciones.__v': 0,

    'archivos.createdAt': 0,
    'archivos.updatedAt': 0,
    'archivos.__v': 0,

    'etiquetas.createdAt': 0,
    'etiquetas.updatedAt': 0,
    'etiquetas.__v': 0,

    'nota.createdAt': 0,
    'nota.updatedAt': 0,
    'nota.__v': 0,

    'alergia.createdAt': 0,
    'alergia.updatedAt': 0,
    'alergia.__v': 0,

    'apoderado.createdAt': 0,
    'apoderado.updatedAt': 0,
    'apoderado.__v': 0,

    'historialClinico.createdAt': 0,
    'historialClinico.updatedAt': 0,
    'historialClinico.__v': 0,

    'recetaMedica.createdAt': 0,
    'recetaMedica.updatedAt': 0,
    'recetaMedica.__v': 0,
    createdAt: 0,
    updatedAt: 0,
  },
};

export const groupStatePaciente: PipelineStage = {
  // cada medico que tiene en receta prescipcion y archivo se hace uno
  // distinto de group
  // Volver a agrupar los archivos en un array
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
    recetaMedica: { $first: '$recetaMedica' },
    fechaRegistro: { $first: '$fechaRegistro' },
    horaRegistro: { $first: '$horaRegistro' },
    prescripciones: { $first: '$prescripciones' },
    archivos: { $push: '$archivos' },
    fuenteCaptacion: { $first: '$fuenteCaptacion' },
  },
};
