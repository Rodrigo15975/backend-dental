import { PipelineStage } from 'mongoose';

export const projectStagePaciente: PipelineStage = {
  $project: {
    role: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  },
};
