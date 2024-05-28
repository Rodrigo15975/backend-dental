import { HttpCode, Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UsuarioFileService } from 'src/modules/usuarios/services/file/file.service';
import {
  MEDICO_REPOSITORY,
  MedicoRepository,
} from '../../repository/medico-repository';
import { MedicoFindService } from '../find/find.service';
import { MedicoDelete } from './types/typesDelete';

@Injectable()
export class MedicoDeleteService implements MedicoDelete {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: MedicoRepository,
    private readonly medicoFindServices: MedicoFindService,
    private readonly handleErrors: HandleErrors,
    // general(medico,usuarios)
    private readonly usuariosFileServices: UsuarioFileService,
  ) {}
  @HttpCode(204)
  async delete(id: string): Promise<void> {
    const medico = await this.medicoFindServices.findByIdMedico(id);
    await this.usuariosFileServices.removeFile(
      medico.id_perfil,
      medico.url_perfil,
    );
    await medico.updateOne({
      activo: false,
    });
    this.handleErrors.handleSendMessage('El médico inactivo correctamente');
  }

  async deleteServicesForMedico(id: string): Promise<void> {
    await this.medicoRepository.deleteServicesForMedico(id);
  }
}
