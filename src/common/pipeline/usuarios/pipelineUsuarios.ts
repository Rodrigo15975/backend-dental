import { PipelineStage } from 'mongoose';

export const projectUsuarioStage: PipelineStage = {
  $project: {
    contraseña: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  },
};
