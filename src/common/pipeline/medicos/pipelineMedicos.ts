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
  },
};
