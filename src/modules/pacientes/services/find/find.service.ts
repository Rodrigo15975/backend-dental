import { Inject, Injectable } from '@nestjs/common';
import { PipelineStage, Types } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import {
  buildLookupStateAlergias,
  unwindAlergiasStage,
} from 'src/common/pipeline/alergia/pipelineAlergia';
import { buildLookupApoderadoState } from 'src/common/pipeline/apoderado/pipelineApoderado';
import { buildLookupArchivos } from 'src/common/pipeline/archivos/pipelineArchivo';
import {
  addFieldsDetallesEstadoTratamiento,
  addFieldsDetallesMedicos,
  buildLookupStageDetalles,
  groupDetalles,
  lookUpDetallesEstadoTratamiento,
  lookUpDetallesMedicos,
  unwindDetallesState,
} from 'src/common/pipeline/detalles/pipelineDetalles';
import {
  buildLookupStageDetallesServicios,
  groupDetallesServicios,
  unwindDetallesServiciosState,
} from 'src/common/pipeline/detallesServicios/pipelineDetallesServicios';
import { buildLookupEtiquetaState } from 'src/common/pipeline/etiqueta/pipelineEtiqueta';
import { buildLookupStageHistorialClinico } from 'src/common/pipeline/historialClinico/pipelineHistorialClinico';
import {
  addFieldsMedicoArchivos,
  gruopMedicoArchivos,
  lookupMedicoArchivos,
  unwindMedicosArchivos,
} from 'src/common/pipeline/medicos/pipelineMedicos';
import {
  buildLookUpStateNotas,
  unwindNotasStage,
} from 'src/common/pipeline/notas/pipelineNota';
import { projectStagePaciente } from 'src/common/pipeline/paciente/pipelinePaciente';
import {
  addFieldsPrescripcionesMedicos,
  buildLookupStagePrescripciones,
  groupPrescripcionesMedicos,
  lookUpPrescripcionesMedicos,
  unwindPrescripciones,
} from 'src/common/pipeline/prescripciones/pipelinePrescripciones';
import {
  addFieldsRecetaMedica,
  buildLookupStageRecetaMedica,
  groupRecetaMedica,
  lookRecetaMedica,
  unwindRecetaMedicaStage,
} from 'src/common/pipeline/recetaMedica/pipelineRecetaMedica';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';
import { Paciente } from '../../entities/paciente.entity';
import {
  PACIENTE_REPOSITORY,
  PacienteRepository,
} from '../../repository/paciente-repository';
import { PacienteFind } from './types/typesFind';
import {
  addFieldsDetallesCita,
  addFieldsDetallesCitaEstado,
  buildLookupStageCitas,
  groupCitas,
  lookUpCitasMedicos,
  lookUpDetallesCitaEstado,
  unwindDetallesCitas,
} from 'src/common/pipeline/citas/pipelineCitas';
@Injectable()
export class PacienteFindService implements PacienteFind {
  constructor(
    @Inject(PACIENTE_REPOSITORY)
    private readonly pacienteRepository: PacienteRepository,
    private readonly handledErrors: HandleErrors,
  ) {}

  // Importante el orden afecta
  // primer oque vaya el que une los ducmentos el lookup
  async findById(id: string): Promise<Paciente> {
    await this.verifyId(id);

    const pipeline: PipelineStage[] = AggregateQuery.pipeline(
      { $match: { _id: new Types.ObjectId(id) } },

      ...buildLookupStageDetalles,
      ...buildLookupStageDetallesServicios,
      ...buildLookupStageHistorialClinico,
      ...buildLookupApoderadoState,
      ...buildLookupStateAlergias,
      ...buildLookUpStateNotas,
      ...buildLookupEtiquetaState,
      ...buildLookupStageRecetaMedica,
      ...buildLookupArchivos,
      ...buildLookupStagePrescripciones,
      ...buildLookupStageCitas,
      // Descomponer el array de prescripciones
      unwindPrescripciones,
      unwindAlergiasStage,
      unwindNotasStage,
      unwindPrescripciones,

      // Citas
      unwindDetallesCitas,
      { $sort: { 'citas.createdAt': -1 } },
      lookUpCitasMedicos,
      lookUpDetallesCitaEstado,
      addFieldsDetallesCita,
      addFieldsDetallesCitaEstado,
      groupCitas,

      // Detalles
      unwindDetallesState,
      { $sort: { 'detalles.createdAt': -1 } },
      lookUpDetallesMedicos,
      lookUpDetallesEstadoTratamiento,
      addFieldsDetallesEstadoTratamiento,
      addFieldsDetallesMedicos,
      groupDetalles,

      //DetallesServicios
      unwindDetallesServiciosState,
      // addFieldsDetalles,
      groupDetallesServicios,

      // Hacer el lookup para obtener los datos del médico en prescripciones
      lookUpPrescripcionesMedicos,
      // Reemplazar el campo del medico en prescripciones con el objeto del médico
      addFieldsPrescripcionesMedicos,

      // Volver a agrupar las prescripciones en un array
      groupPrescripcionesMedicos,

      // Estoy poniendo en orden, si no no funcionara importante
      // Descomponer el array de recetaMedica
      // SI no se descomponne, se un array de arrays
      unwindRecetaMedicaStage,
      lookRecetaMedica,
      addFieldsRecetaMedica,
      // Volver a agrupar las recetaMedica en un array
      groupRecetaMedica,

      // tiene que ir en orden
      unwindMedicosArchivos,
      { $sort: { 'archivos.createdAt': -1 } },
      // Volver a agrupar los archivos en un array
      lookupMedicoArchivos,
      addFieldsMedicoArchivos,
      gruopMedicoArchivos,
      // Pacientes datos omitidos
      projectStagePaciente,
    );
    const query = await this.pacienteRepository.aggregate(pipeline);
    return query[0];
  }
  async verifyId(id: string) {
    const paciente = await this.pacienteRepository.findById(id);
    if (!paciente)
      this.handledErrors.handleErrorsNotFoundException(
        `El ID ${id} del paciente no existe`,
      );
    return paciente;
  }
  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepository.findAll();
  }
  async findByCelular(celular: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findByCelular(celular);
    if (!paciente)
      this.handledErrors.handleErrorsNotFoundException(
        `El celular ${celular} del paciente no existe`,
      );
    return paciente;
  }
  async findByDni(dni: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findByDni(dni);
    if (!paciente)
      this.handledErrors.handleErrorsNotFoundException(
        `El DNI ${dni} del paciente no existe`,
      );
    return paciente;
  }
  async findByEmail(email: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findByEmail(email);
    if (!paciente)
      this.handledErrors.handleErrorsNotFoundException(
        `El email ${email} del paciente no existe`,
      );
    return paciente;
  }
  async findByExistingCelular(celular: string): Promise<Paciente> {
    const paciente =
      await this.pacienteRepository.findByExistingCelular(celular);
    if (paciente)
      this.handledErrors.handleErrorsConflicException(
        `El celular ${celular} ya está registrado`,
      );
    return paciente;
  }
  async findByExistingDni(dni: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findByExistingDni(dni);
    if (paciente)
      this.handledErrors.handleErrorsConflicException(
        `El DNI ${dni} ya está registrado`,
      );
    return paciente;
  }

  async findByExistingEmail(email: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findByExistingEmail(email);
    if (paciente)
      this.handledErrors.handleErrorsConflicException(
        `El email ${email} ya está registrado`,
      );
    return paciente;
  }
}
