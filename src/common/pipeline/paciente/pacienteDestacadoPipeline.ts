import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const topPacienteService: PipelineStage[] = AggregateQuery.pipeline(
  { $match: { docClone: false } },
  {
    $addFields: {
      monto_pagado: { $toDouble: '$monto_pagado' },
    },
  },
  {
    $group: {
      _id: '$paciente',
      totalGasto: { $sum: '$monto_pagado' },
    },
  },
  { $sort: { totalGasto: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: 'pacientes',
      localField: '_id',
      foreignField: '_id',
      as: 'paciente',
    },
  },
  { $unwind: '$paciente' },
  {
    $project: {
      _id: 0,
      name: '$paciente.name',
      apellidos: '$paciente.apellidos',
      dni: '$paciente.dni',
      url_perfil: `$paciente.url_perfil`,
      totalGasto: 1,
    },
  },
  { $limit: 1 }, // Añadir una etapa de $limit adicional para asegurar solo un resultado
);
