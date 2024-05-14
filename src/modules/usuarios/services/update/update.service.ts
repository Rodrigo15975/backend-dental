import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UpdateUsuarioDto } from '../../dto/update-usuario.dto';
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from '../../repository/usuario-repository';
import { UsuarioFindService } from '../find/find.service';
import { UsuarioUpdate } from './types/typesUpdate';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';

@Injectable()
export class UsuarioUpdateService implements UsuarioUpdate {
  constructor(
    // no olvidar inyectar
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly handleErrors: HandleErrors,
    private readonly usuarioFindServices: UsuarioFindService,
    private readonly medicoFindService: MedicoFindService,
  ) {}

  async update(updateUsuarioDto: UpdateUsuarioDto, id: string): Promise<void> {
    const { celular, email } = updateUsuarioDto;
    const usuario = await this.usuarioFindServices.findById(id);

    if (email !== usuario.email) await this.checkEmail(email);
    if (celular !== usuario.celular) await this.checkCelular(celular);

    delete updateUsuarioDto.role;

    await this.usuarioRepository.update(id, updateUsuarioDto);
    this.handleErrors.handleSendMessage(
      'El usuario fue actualizado exitosamente',
    );
  }
  async updateProfile(
    id: string,
    id_perfil: string,
    url_perfil: string,
  ): Promise<void> {
    await this.usuarioRepository.updateProfile(id, id_perfil, url_perfil);
    this.handleErrors.handleSendMessage(
      'El perfil del usuario fue actualizado correctamente',
    );
  }

  private async checkEmail(email: string): Promise<void> {
    await this.medicoFindService.findByEmailExistingInMedico(email);
    await this.usuarioFindServices.findByEmailExisting(email);
  }
  private async checkCelular(celular: string): Promise<void> {
    await this.medicoFindService.findByPhoneExistingInMedico(celular);
    await this.usuarioFindServices.findByPhoneExisting(celular);
  }
}
