import { HttpCode, Inject, Injectable } from '@nestjs/common';
import {
  MEDICO_REPOSITORY,
  MedicoRepository,
} from '../../repository/medico-repository';
import { MedicoDelete } from './types/typesDelete';
import { MedicoFindService } from '../find/find.service';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class MedicoDeleteService implements MedicoDelete {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: MedicoRepository,
    private readonly medicoFindServices: MedicoFindService,
    private readonly handleErrors: HandleErrors,
  ) {}
  @HttpCode(204)
  async delete(id: string): Promise<void> {
    await this.medicoFindServices.findById(id);
    await this.medicoRepository.delete(id);
    this.handleErrors.handleSendMessage(
      'El médico fue eliminado correctamente',
    );
  }

  async deleteServicesForMedico(id: string): Promise<void> {
    await this.medicoRepository.deleteServicesForMedico(id);
  }
}
