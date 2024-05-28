import { Inject, Injectable } from '@nestjs/common';
import { PipelineStage, Types } from 'mongoose';
import {
  buildLookupStateAlergias,
  projectAlergiasState,
  unwindAlergiasStage,
} from 'src/common/alergia/pipelineAlergia';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import {
  buildLookupApoderadoState,
  projectStageApoderado,
} from 'src/common/pipeline/apoderado/pipelineApoderado';
import {
  buildLookupArchivos,
  projectStArchivos,
} from 'src/common/pipeline/archivos/pipelineArchivo';
import {
  buildLookupEtiquetaState,
  projectStageEtiqueta,
} from 'src/common/pipeline/etiqueta/pipelineEtiqueta';
import {
  buildLookupStageHistorialClinico,
  projectHistorialClinicoState,
} from 'src/common/pipeline/historialClinico/pipelineHistorialClinico';
import {
  buildLookUpStateNotas,
  projectStageNota,
  unwindNotasStage,
} from 'src/common/pipeline/notas/pipelineNota';
import { projectStagePaciente } from 'src/common/pipeline/paciente/pipelinePaciente';
import {
  buildLookupStagePrescripciones,
  projectStatePrescripciones,
} from 'src/common/pipeline/prescripciones/pipelinePrescripciones';
import { buildLookupStageRecetaMedica } from 'src/common/pipeline/recetaMedica/pipelineRecetaMedica';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';
import { Paciente } from '../../entities/paciente.entity';
import {
  PACIENTE_REPOSITORY,
  PacienteRepository,
} from '../../repository/paciente-repository';
import { PacienteFind } from './types/typesFind';
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
      {
        $match: { _id: new Types.ObjectId(id) },
      },
      projectStagePaciente,
      ...buildLookupArchivos,

      projectStArchivos,

      ...buildLookupApoderadoState,
      projectStageApoderado,

      ...buildLookupEtiquetaState,
      projectStageEtiqueta,

      ...buildLookupStageHistorialClinico,
      projectHistorialClinicoState,

      ...buildLookupStagePrescripciones,

      projectStatePrescripciones,

      ...buildLookupStageRecetaMedica,

      ...buildLookupStateAlergias,
      projectAlergiasState,
      unwindAlergiasStage,

      ...buildLookUpStateNotas,
      projectStageNota,
      unwindNotasStage,
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
        `El ${dni} del paciente no existe`,
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
