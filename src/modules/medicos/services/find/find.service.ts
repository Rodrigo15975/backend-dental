import { Inject, Injectable } from '@nestjs/common';
import {
  MEDICO_REPOSITORY,
  MedicoRepository,
} from '../../repository/medico-repository';
import { MedicoFind } from './types/typesFind';
import { Medico } from '../../entities/medico.entity';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class MedicoFindService implements MedicoFind {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: MedicoRepository,
    private readonly handleErrors: HandleErrors,
  ) {}
  async findAllMedicos(): Promise<Medico[]> {
    const medicos = await this.medicoRepository.findAllMedicos();
    if (medicos.length === 0)
      this.handleErrors.handleSendMessage('La lista está sin datos');
    return medicos;
  }
  async findByDni(dni: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByDni(dni);
    if (!medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El DNI ${dni} no está registrado`,
      );
    return medicoFound;
  }
  async findByEmail(email: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByEmail(email);
    if (!medicoFound)
      this.handleErrors.handleErrorsNotFoundException(
        `El email ${email} no fue encontrado `,
      );
    return medicoFound;
  }
  async findById(id: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findById(id);
    if (!medicoFound)
      this.handleErrors.handleErrorsNotFoundException(
        `El id ${id} no fue encontrado `,
      );
    return medicoFound;
  }
  async findByPhone(celular: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByPhone(celular);
    if (!medicoFound)
      this.handleErrors.handleErrorsNotFoundException(
        `El celular ${celular} no fue encontrado `,
      );
    return medicoFound;
  }

  async findByDniExisting(dni: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByDniExisting(dni);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El DNI ${dni} ya está registrado`,
      );
    return medicoFound;
  }
  async findByEmailExisting(email: string): Promise<Medico> {
    const medicoFound = await this.medicoRepository.findByEmailExisting(email);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El email ${email} ya está registrado`,
      );
    return medicoFound;
  }
  async findByPhoneExisting(celular: string): Promise<Medico> {
    const medicoFound =
      await this.medicoRepository.findByPhoneExisting(celular);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El celular ${celular} ya está registrado`,
      );
    return medicoFound;
  }
  async findByDniExistingInUsuario(dni: string): Promise<void> {
    const medicoFound = await this.medicoRepository.findByDniExisting(dni);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El DNI ${dni} ya está registrado`,
      );
  }
  async findByEmailExistingInUsuario(email: string): Promise<void> {
    const medicoFound = await this.medicoRepository.findByEmailExisting(email);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El email ${email} ya está registrado`,
      );
  }
  async findByPhoneExistingInUsuario(celular: string): Promise<void> {
    const medicoFound =
      await this.medicoRepository.findByPhoneExisting(celular);
    if (medicoFound)
      this.handleErrors.handleErrorsConflicException(
        `El celular ${celular} ya está registrado`,
      );
  }
}
