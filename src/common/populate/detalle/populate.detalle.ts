import { PopulateOptions } from 'mongoose';

export const populateDetalle: PopulateOptions[] = [
  {
    path: 'paciente',
    select: 'dni name apellidos',
  },
];

export const selectDetalle = {
  medico: 0,
  docClone: 0,
  __v: 0,
  updatedAt: 0,
  createdAt: 0,
  fecha_atencion: 0,
  _id: 0,
  estado_tratamiento: 0,
};
