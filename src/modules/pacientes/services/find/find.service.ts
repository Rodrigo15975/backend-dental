import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { Paciente } from '../../entities/paciente.entity';
// import { queryPaciente } from '../../../../common/pipeline/paciente/PacienteQueryPipeline';
import {
  PACIENTE_REPOSITORY,
  PacienteRepository,
} from '../../repository/paciente-repository';
import { MonthlyStats, PacienteFind } from './types/typesFind';
@Injectable()
export class PacienteFindService implements PacienteFind {
  constructor(
    @Inject(PACIENTE_REPOSITORY)
    private readonly pacienteRepository: PacienteRepository,
    private readonly handledErrors: HandleErrors,
  ) {}

  async findForMounthStatistics(): Promise<MonthlyStats[]> {
    const monthlyStats =
      await this.pacienteRepository.findForMounthStatistics();
    return monthlyStats.map((current, index, array) => {
      const previous = array[index - 1] || { count: 0 };
      return {
        ...current,
        previousCount: previous.count,
        difference: current.count - previous.count,
      };
    });
  }
  async findById(id: string): Promise<Paciente> {
    // Se esta utilizando populate,  no aggregate importanate por ahora
    return await this.verifyId(id);
    // const pipeline = queryPaciente(id);
    // const query = await this.pacienteRepository.aggregate(pipeline);
    // return query[0];
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
