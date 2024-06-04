import { PipelineStage } from 'mongoose';

export const projectStageMedico: PipelineStage = {
  $project: {
    contraseña: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
    'servicios.count': 0,
    'servicios.createdAt': 0,
    'servicios.updatedAt': 0,
    'servicios.__v': 0,
    'asistencia.createdAt': 0,
    'asistencia.updatedAt': 0,
    'asistencia.__v': 0,
  },
};

export const unwindMedicosArchivos: PipelineStage = {
  $unwind: { path: '$archivos', preserveNullAndEmptyArrays: true },
};
// todo esto tien que ir en ordern, para que se agrupen si no
// se duplicaran y pondran el mismo medico en todos
export const lookupMedicoArchivos: PipelineStage = {
  // Hacer el lookup para obtener los datos del médico en archivos

  $lookup: {
    from: 'medicos', // Nombre de la colección de médicos
    localField: 'archivos.medico',
    foreignField: '_id',
    as: 'medicoArchivo',
    pipeline: [
      { $project: { name: 1, apellidos: 1 } }, // Seleccionar solo los campos name y apellidos
    ],
  },
};
export const addFieldsMedicoArchivos: PipelineStage = {
  // Reemplazar el campo del medico en archivos con el objeto del médico
  $addFields: {
    'archivos.medico': {
      $arrayElemAt: ['$medicoArchivo', 0],
    },
  },
};

export const gruopMedicoArchivos: PipelineStage = {
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
