import { PipelineStage } from 'mongoose';

export class AggregateQuery {
  static buildLookupStage(from: string, as: string) {
    return [
      {
        $lookup: {
          from: from,
          localField: as,
          foreignField: '_id',
          as: as,
        },
      },
      // { $unwind: { path: `$${as}`, preserveNullAndEmptyArrays: true } },
    ];
  }
  static pipeline(...stage1: PipelineStage[]): PipelineStage[] {
    return [...stage1];
  }
}
