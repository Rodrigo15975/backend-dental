import { PipelineStage } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';

export const buildLookupArchivos: PipelineStage[] =
  AggregateQuery.buildLookupStage('archivos', 'archivos');

// export const buildLookupMedicos: PipelineStage[] =
//   AggregateQuery.buildLookupStage('medicos', 'medico');

// export const unwindArchivosStage: PipelineStage = {};

// no trae los datos del id medico arreglarlo
export const projectStArchivos: PipelineStage = {
  $project: {
    'archivos.createdAt': 0,
    'archivos.updatedAt': 0,
    'archivos.__v': 0,
  },
};

// nombre: 1,
// descripcion: 1,
// url_archivo: 1,
// id_url_archivo: 1,
// fechaCreacion: 1,
// horaCreacion: 1,
// 'archivos.medico._id': 1,
// 'archivos.medico.dni': 1,
// 'archivos.medico.role': 1,
// 'archivos.medico.name': 1,
// 'archivos.medico.apellidos': 1,
// 'archivos.medico.email': 1,
// 'archivos.medico.celular': 1,
// 'archivos.medico.genero': 1,
// 'archivos.medico.fechaNacimiento': 1,
// 'archivos.medico.url_perfil': 1,
// 'archivos.medico.departamento': 1,
// 'archivos.medico.distrito': 1,
// 'archivos.medico.ciudad': 1,
// 'archivos.medico.direccion': 1,
// 'archivos.medico.servicios': 1,
// 'archivos.medico.activo': 1,
// 'archivos.medico.asistencia': 1,
// 'archivos.medico.createdAt': 1,
// 'archivos.medico.updatedAt': 1,
