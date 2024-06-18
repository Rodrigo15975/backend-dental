import { Inject, Injectable } from '@nestjs/common';
import { PipelineStage, Types } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { projectStageMedico } from 'src/common/pipeline/medicos/pipelineMedicos';
import {
  addFieldsRolesStage,
  lookupRolesStage,
  unwindRoleStage,
} from 'src/common/pipeline/roles/pipelineRoles';
import { lookupServiciosStage } from 'src/common/pipeline/servicios/pipelineServicios';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';
import { generalValidation } from 'src/common/utils/regs/reg';
import { Medico } from '../../entities/medico.entity';
import {
  MEDICO_REPOSITORY,
  MedicoRepository,
} from '../../repository/medico-repository';
import { MedicoFind } from './types/typesFind';
import { lookupAsistenciaStage } from 'src/common/pipeline/asistencia/pipelineAsistencia';
import { PropsCreateServicioDto } from 'src/modules/servicios/dto/create-servicio.dto';

@Injectable()
export class MedicoFindService implements MedicoFind {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: MedicoRepository,
    private readonly handleErrors: HandleErrors,
  ) {}

  async findAllServices(id: string): Promise<PropsCreateServicioDto[]> {
    const medico = await this.findById(id);
    return medico.servicios;
  }

  async findAuthByMedico(identifier: string): Promise<Medico> {
    const email = generalValidation.matchesEmail.test(identifier);
    const celular = generalValidation.matchesPhones.test(identifier);
    const dni = generalValidation.matchesDNI.test(identifier);
    const authFunctionsPromises: Promise<Medico>[] = [];

    if (email)
      authFunctionsPromises.push(this.medicoRepository.findByEmail(identifier));
    if (celular)
      authFunctionsPromises.push(this.medicoRepository.findByPhone(identifier));
    if (dni)
      authFunctionsPromises.push(this.medicoRepository.findByDni(identifier));

    // Ayuda con el paralelismo
    const results = await Promise.all(authFunctionsPromises);
    // Devuelve el primer elemento que no es undefined
    return results.find((result) => result !== undefined);
  }
  async aggregateGeneric<T>(pipeline: PipelineStage[]): Promise<T> {
    return await this.medicoRepository.aggregateGeneric<T>(pipeline);
  }

  async findAllMedicos(): Promise<Medico[]> {
    const pipeline: PipelineStage[] = AggregateQuery.pipeline(
      ...lookupRolesStage,
      unwindRoleStage,
      addFieldsRolesStage,

      ...lookupAsistenciaStage,

      ...lookupServiciosStage,
      {
        $sort: {
          createdAt: -1,
        },
      },
      projectStageMedico,
    );
    const medicos = await this.aggregateGeneric<Medico[]>(pipeline);

    return medicos;
  }
  async findByDni(dni: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByDni(dni);

    if (!medicoFound)
      this.handleErrors.handleErrorsNotFoundException(
        `El médico con DNI ${dni} no está registrado`,
      );
    return medicoFound;
  }
  async findByEmail(email: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByEmail(email);
    if (!medicoFound)
      this.handleErrors.handleErrorsNotFoundException(
        `El médico con email ${email} no fue encontrado`,
      );
    return medicoFound;
  }
  // Este devuelve todo los metodos
  async findByIdMedico(id: string): Promise<Medico> {
    return await this.verifyId(id);
  }
  async verifyId(id: string) {
    const medico = await this.medicoRepository.findById(id);
    if (!medico)
      this.handleErrors.handleErrorsNotFoundException(
        `El médico con id ${id} no fue encontrado`,
      );
    return medico;
  }

  // Este no trae los metodos por eso cree otro
  async findById(id: string): Promise<Medico> {
    await this.verifyId(id);
    const pipeline: PipelineStage[] = AggregateQuery.pipeline(
      { $match: { _id: new Types.ObjectId(id) } },
      ...lookupRolesStage,
      addFieldsRolesStage,
      unwindRoleStage,
      ...lookupServiciosStage,
      { $project: { contraseña: 0 } },
    );
    const data = await this.aggregateGeneric<Medico>(pipeline);
    return data[0];
  }

  async findByPhone(celular: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByPhone(celular);
    if (!medicoFound)
      this.handleErrors.handleErrorsNotFoundException(
        `El médico con el celular ${celular} no fue encontrado `,
      );
    return medicoFound;
  }

  async findByDniExisting(dni: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByDniExisting(dni);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El médico con DNI ${dni} ya está registrado`,
      );
    return medicoFound;
  }
  async findByEmailExisting(email: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByEmailExisting(email);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El médico con email ${email} ya está registrado`,
      );
    return medicoFound;
  }
  async findByPhoneExisting(celular: string): Promise<Medico> {
    const medicoFound =
      await this.medicoRepository.findByPhoneExisting(celular);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El médico con celular ${celular} ya está registrado`,
      );
    return medicoFound;
  }
  async findByDniExistingInMedico(dni: string): Promise<void> {
    const medicoFound = await this.medicoRepository.findByDniExisting(dni);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El DNI ${dni} ya está registrado en la lista de Médicos`,
      );
  }
  async findByEmailExistingInMedico(email: string): Promise<void> {
    const medicoFound = await this.medicoRepository.findByEmailExisting(email);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El email ${email} ya está registrado en la lista de Médicos`,
      );
  }
  async findByPhoneExistingInMedico(celular: string): Promise<void> {
    const medicoFound =
      await this.medicoRepository.findByPhoneExisting(celular);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El celular ${celular} ya está registrado en la lista de Médicos`,
      );
  }
}
