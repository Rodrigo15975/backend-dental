import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UpdateUsuarioDto } from '../../dto/update-usuario.dto';
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from '../../repository/usuario-repository';
import { UsuarioFindService } from '../find/find.service';
import { UsuarioUpdate } from './types/typesUpdate';

@Injectable()
export class UsuarioUpdateService implements UsuarioUpdate {
  constructor(
    // no olvidar inyectar
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly handleErrors: HandleErrors,
    private readonly usuarioFindServices: UsuarioFindService,
  ) {}

  async update(updateUsuarioDto: UpdateUsuarioDto, id: string): Promise<void> {
    await this.usuarioFindServices.findById(id);
    await this.usuarioRepository.update(id, updateUsuarioDto);
    this.handleErrors.handleSendMessage('Actualización exitosa');
  }
}
