import { Inject, Injectable } from '@nestjs/common';
import { CitaDelete } from './types/typesDelete';
import {
  CITA_REPOSITORY,
  CitaRepository,
} from '../../repository/cita-repository';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';
import { Types } from 'mongoose';

@Injectable()
export class CitaDeleteService implements CitaDelete {
  constructor(
    @Inject(CITA_REPOSITORY) private readonly citaRepository: CitaRepository,
    private readonly handledErrors: HandleErrors,
    private readonly pacienteFindService: PacienteFindService,
  ) {}
  async delete(idCita: string, idPaciente: string): Promise<void> {
    await this.pacienteDeleteCita(idPaciente, idCita);
    await this.citaRepository.deleteCita(idCita);
    this.handledErrors.handleSendMessage('Cita removida');
  }
  async deleteCitaForPaciente(id: string) {
    await this.citaRepository.deleteCita(id);
  }
  private async pacienteDeleteCita(id: string, idCita: string) {
    const paciente = await this.pacienteFindService.verifyId(id);
    await paciente.updateOne({
      $pull: {
        citas: new Types.ObjectId(idCita),
      },
    });
  }
}
