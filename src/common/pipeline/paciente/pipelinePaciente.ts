import { PipelineStage } from 'mongoose';

export const projectStagePaciente: PipelineStage = {
  $project: {
    // Quita todo los valores que no necesito
    'prescripciones.createdAt': 0,
    'prescripciones.updatedAt': 0,
    'prescripciones.__v': 0,

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

    'citas.__v': 0,
    'citas.paciente': 0,
    createdAt: 0,
    updatedAt: 0,
  },
};
