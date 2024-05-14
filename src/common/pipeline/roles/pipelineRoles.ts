import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const lookupRolesStage: PipelineStage[] =
  AggregateQuery.buildLookupStage('roles', 'role');

export const unwindRoleStage: PipelineStage = {
  $unwind: '$role',
};

export const addFieldsRolesStage: PipelineStage = {
  $addFields: {
    role: '$role.role',
  },
};
