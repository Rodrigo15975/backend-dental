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
    ];
  }
  // Aplana los datos pero si  es un array vacio lo quita y quita todo los datos
  // importante es mejor hacerlo individual
  // { $unwind: { path: `$${as}`, preserveNullAndEmptyArrays: true } },

  static pipeline(...stage1: PipelineStage[]): PipelineStage[] {
    return [...stage1];
  }
}
