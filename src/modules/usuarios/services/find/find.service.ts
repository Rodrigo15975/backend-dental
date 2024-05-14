import { Inject, Injectable } from '@nestjs/common';
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from '../../repository/usuario-repository';
import { Usuario } from '../../entities/usuario.entity';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UsuarioFind } from './types/typesFind';
import { generalValidation } from 'src/common/utils/regs/reg';
import { PipelineStage, Types } from 'mongoose';
import { AggregateQuery } from 'src/common/utils/agreggate/agreggate';
import {
  addFieldsRolesStage,
  lookupRolesStage,
  unwindRoleStage,
} from 'src/common/pipeline/roles/pipelineRoles';
import { projectUsuarioStage } from 'src/common/pipeline/usuarios/pipelineUsuarios';

@Injectable()
export class UsuarioFindService implements UsuarioFind {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly handleErrors: HandleErrors,
  ) {}

  async aggregateGeneric<T>(pipeline: PipelineStage[]): Promise<T> {
    return await this.usuarioRepository.aggregateGeneric<T>(pipeline);
  }

  async findAuthByUsuario(identifier: string): Promise<Usuario> {
    const email = generalValidation.matchesEmail.test(identifier);
    const celular = generalValidation.matchesPhones.test(identifier);
    const dni = generalValidation.matchesDNI.test(identifier);

    const authFunctionsPromise: Promise<Usuario>[] = [];
    if (email)
      authFunctionsPromise.push(this.usuarioRepository.findByEmail(identifier));
    if (celular)
      authFunctionsPromise.push(this.usuarioRepository.findByPhone(identifier));
    if (dni)
      authFunctionsPromise.push(this.usuarioRepository.findByDni(identifier));
    const results = await Promise.all(authFunctionsPromise);
    // Devuelve el primer elemento que no es undefined
    return results.find((result) => result !== undefined);
  }

  async findAllUsuarios(): Promise<Usuario[]> {
    const pipeline: PipelineStage[] = AggregateQuery.pipeline(
      ...lookupRolesStage,
      unwindRoleStage,
      addFieldsRolesStage,
      projectUsuarioStage,
    );
    const usuarios = await this.aggregateGeneric<Usuario[]>(pipeline);
    if (usuarios.length === 0)
      this.handleErrors.handleSendMessage(
        'La lista de usuarios está sin datos',
      );
    return usuarios;
  }
  async findByDni(dni: string): Promise<Usuario> {
    const userFound = await this.usuarioRepository.findByDni(dni);
    if (!userFound)
      this.handleErrors.handleErrorsConflicException(
        `El DNI ${dni} no está registrado`,
      );
    return userFound;
  }
  async findByEmail(email: string): Promise<Usuario> {
    const userFound = await this.usuarioRepository.findByEmail(email);
    if (!userFound)
      this.handleErrors.handleErrorsNotFoundException(
        `El email ${email} no fue encontrado `,
      );
    return userFound;
  }
  private async verifyId(id: string) {
    const user = await this.usuarioRepository.findById(id);
    if (!user)
      this.handleErrors.handleErrorsNotFoundException(
        `El id ${id} no fue encontrado `,
      );
    return user;
  }
  async findById(id: string): Promise<Usuario> {
    await this.verifyId(id);
    const pipeline: PipelineStage[] = AggregateQuery.pipeline(
      { $match: { _id: new Types.ObjectId(id) } },
      ...AggregateQuery.buildLookupStage('roles', 'role'),
      {
        $addFields: {
          role: '$role.role',
        },
      },
      { $project: { contraseña: 0 } },
    );
    const user = await this.aggregateGeneric<Usuario>(pipeline);
    return user[0];
  }
  async findByPhone(celular: string): Promise<Usuario> {
    const userFound = await this.usuarioRepository.findByPhone(celular);
    if (!userFound)
      this.handleErrors.handleErrorsNotFoundException(
        `El celular ${celular} no fue encontrado `,
      );
    return userFound;
  }

  async findByDniExisting(dni: string): Promise<Usuario> {
    const userFound = await this.usuarioRepository.findByDniExisting(dni);
    if (userFound)
      this.handleErrors.handleErrorsConflicException(
        `El DNI ${dni} ya está registrado`,
      );
    return userFound;
  }
  async findByEmailExisting(email: string): Promise<Usuario> {
    const userFound = await this.usuarioRepository.findByEmailExisting(email);
    if (userFound)
      this.handleErrors.handleErrorsConflicException(
        `El email ${email} ya está registrado`,
      );
    return userFound;
  }
  async findByPhoneExisting(celular: string): Promise<Usuario> {
    const userFound = await this.usuarioRepository.findByPhoneExisting(celular);
    if (userFound)
      this.handleErrors.handleErrorsConflicException(
        `El celular ${celular} ya está registrado`,
      );
    return userFound;
  }

  async findByDniExistingInUsuario(dni: string): Promise<void> {
    const userFound = await this.usuarioRepository.findByDniExisting(dni);
    if (userFound)
      this.handleErrors.handleErrorsConflicException(
        `El DNI ${dni} se encuentra en la lista de Usuario`,
      );
  }
  async findByEmailExistingInUsuario(email: string): Promise<void> {
    const userFound = await this.usuarioRepository.findByEmailExisting(email);
    if (userFound)
      this.handleErrors.handleErrorsConflicException(
        `El email ${email} se encuentra en la lista de Usuario`,
      );
  }
  async findByPhoneExistingInUsuario(celular: string): Promise<void> {
    const userFound = await this.usuarioRepository.findByPhoneExisting(celular);
    if (userFound)
      this.handleErrors.handleErrorsConflicException(
        `El celular ${celular} se encuentra en la lista de Usuario`,
      );
  }
}
