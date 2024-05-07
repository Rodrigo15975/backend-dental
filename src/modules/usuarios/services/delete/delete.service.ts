import { Inject, Injectable } from '@nestjs/common';
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from '../../repository/usuario-repository';
import { UsuarioDelete } from './types/typesDelete';
import { UsuarioFindService } from '../find/find.service';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class UsuarioDeleteService implements UsuarioDelete {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly usuarioFindServices: UsuarioFindService,
    private readonly handleErrors: HandleErrors,
  ) {}

  async delete(id: string): Promise<void> {
    await this.usuarioFindServices.findById(id);
    await this.usuarioRepository.delete(id);
    this.handleErrors.handleSendMessage('Eliminación exitosa');
  }
}
