import { Inject, Injectable } from '@nestjs/common';
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from '../../repository/usuario-repository';
import { Usuario } from '../../entities/usuario.entity';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UsuarioFind } from './types/typesFind';

@Injectable()
export class UsuarioFindService implements UsuarioFind {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly handleErrors: HandleErrors,
  ) {}

  async findAllUsuarios(): Promise<Usuario[]> {
    const usuarios = await this.usuarioRepository.findAllUsuarios();
    if (usuarios.length === 0)
      this.handleErrors.handleSendMessage('La lista está sin datos');
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
  async findById(id: string): Promise<Usuario> {
    const userFound = await this.usuarioRepository.findById(id);
    if (!userFound)
      this.handleErrors.handleErrorsNotFoundException(
        `El id ${id} no fue encontrado `,
      );
    return userFound;
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
