import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const monthlyStatsPipeline: PipelineStage[] = AggregateQuery.pipeline(
  {
    $project: {
      month: {
        $month: { $dateFromString: { dateString: '$fechaRegistro' } },
      },
      year: {
        $year: { $dateFromString: { dateString: '$fechaRegistro' } },
      },
    },
  },
  {
    $group: {
      _id: { year: '$year', month: '$month' },
      count: { $sum: 1 },
    },
  },
  {
    $sort: { '_id.year': 1, '_id.month': 1 },
  },
);
