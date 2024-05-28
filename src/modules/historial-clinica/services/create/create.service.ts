import { Inject, Injectable } from '@nestjs/common';
import {
  HISTORIAL_CLINICA_REPOSITORY,
  HistorialClinicRepository,
} from '../../repository/historial-clinica-repository';
import { HistorialClinicoCreate } from './types/typesHistorialClinico';
import { CreateHistorialClinicaDto } from '../../dto/create-historial-clinica.dto';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';

@Injectable()
export class HistorialClinicoCreateService implements HistorialClinicoCreate {
  constructor(
    @Inject(HISTORIAL_CLINICA_REPOSITORY)
    private readonly historialClinicoRepository: HistorialClinicRepository,
    private readonly hanledErrors: HandleErrors,
    private readonly pacienteFindService: PacienteFindService,
  ) {}

  async create(
    createHistorialClinicaDto: CreateHistorialClinicaDto,
    id: string,
  ): Promise<void> {
    const paciente = await this.pacienteFindService.verifyId(id);
    const historial = await this.historialClinicoRepository.create(
      createHistorialClinicaDto,
    );
    await paciente.updateOne({
      $push: {
        historialClinico: historial._id,
      },
    });
    this.hanledErrors.handleSendMessage('Historial agregado correctamente');
  }
}
