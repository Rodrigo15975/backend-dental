import { Inject, Injectable } from '@nestjs/common';
import {
  ETIQUETA_REPOSITORY,
  EtiquetaRepository,
} from '../../repository/etiqueta-repository';
import { EtiquetaRemove } from './types/typesRemove';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';
import { Types } from 'mongoose';

@Injectable()
export class EtiquetaRemoveService implements EtiquetaRemove {
  constructor(
    @Inject(ETIQUETA_REPOSITORY)
    private readonly etiquetaRepository: EtiquetaRepository,
    private readonly hanledErrors: HandleErrors,
    private readonly pacienteFindService: PacienteFindService,
  ) {}
  async remove(id: string, idPaciente: string): Promise<void> {
    await this.verifyIdEtiqueta(id);
    const paciente = await this.pacienteFindService.verifyId(idPaciente);
    await paciente.updateOne({
      $pull: {
        etiquetas: new Types.ObjectId(id),
      },
    });
    this.hanledErrors.handleSendMessage('Etiqueta removida');
  }
  private async verifyIdEtiqueta(id: string) {
    // no se elimina la etiqueta, ya que so n4 por defectos
    const etiqueta = await this.etiquetaRepository.findById(id);
    if (!etiqueta)
      this.hanledErrors.handleErrorsNotFoundException(
        `ID etiqueta ${id} no existe`,
      );
    return etiqueta;
  }
}
