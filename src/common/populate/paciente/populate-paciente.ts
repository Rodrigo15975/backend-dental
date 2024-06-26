// populate-config.ts

import { PopulateOptions } from 'mongoose';
import { Cita } from 'src/modules/citas/entities/cita.entity';
import { EstadoCita } from 'src/modules/estado-cita/entities/estado-cita.entity';
import { EstadoServicio } from 'src/modules/estado-servicio/entities/estado-servicio.entity';
import { Medico } from 'src/modules/medicos/entities/medico.entity';
import { Paciente } from 'src/modules/pacientes/entities/paciente.entity';

export const populateOptionsPaciente: PopulateOptions[] = [
  {
    path: 'etiquetas',
    model: 'Etiqueta',
  },
  {
    path: 'nota',
    model: 'Nota',
  },
  {
    path: 'alergia',
    model: 'Alergia',
  },
  {
    path: 'apoderado',
    model: 'Apoderado',
    options: {
      sort: { createdAt: -1 },
    },
  },
  {
    path: 'historialClinico',
    model: 'HistorialClinica',
    options: {
      sort: { createdAt: -1 },
    },
  },
  {
    path: 'citas',
    model: Cita.name,
    populate: [
      {
        path: 'paciente',
        model: Paciente.name,
        select: 'name dni apellidos',
      },
      {
        path: 'medico',
        model: Medico.name,
        select: 'name apellidos',
      },
      {
        path: 'estado',
        model: EstadoCita.name,
      },
    ],
    options: {
      sort: { createdAt: -1 },
    },
  },
  {
    path: 'detallesServicios',
    model: 'DetallesServicio',
    options: {
      sort: { createdAt: -1 },
    },
  },
  {
    path: 'detalles',
    model: 'Detalle',
    populate: [
      {
        path: 'medico',
        model: Medico.name,
        select: 'name apellidos',
      },
      {
        path: 'estado_tratamiento',
        model: EstadoServicio.name,
      },
      {
        path: 'paciente',
        model: Paciente.name,
        select: 'name apellidos dni',
      },
    ],
    options: {
      sort: { createdAt: -1 },
    },
  },
  {
    path: 'recetaMedica',
    model: 'Receta',
    populate: [
      {
        path: 'medico',
        model: Medico.name,
        select: 'name apellidos',
      },
    ],
    options: {
      sort: { createdAt: -1 },
    },
  },
  {
    path: 'prescripciones',
    model: 'Prescripciones',
    populate: [
      {
        path: 'medico',
        model: Medico.name,
        select: 'name apellidos',
      },
    ],
    options: {
      sort: { createdAt: -1 },
    },
  },
  {
    path: 'archivos',
    model: 'Archivo',
    populate: [
      {
        path: 'medico',
        model: Medico.name,
        select: 'name apellidos',
      },
    ],
    options: {
      sort: { createdAt: -1 },
    },
  },
];
