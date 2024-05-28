import { Inject, Injectable } from '@nestjs/common';
import {
  AsignarEtiquetas,
  CreateEtiquetaDto,
} from '../../dto/create-etiqueta.dto';
import {
  ETIQUETA_REPOSITORY,
  EtiquetaRepository,
} from '../../repository/etiqueta-repository';
import { EtiquetaCreate } from './types/typesCreate';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';
import { Types } from 'mongoose';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class EtiquetaCreateService implements EtiquetaCreate {
  constructor(
    @Inject(ETIQUETA_REPOSITORY)
    private readonly etiquetaRepository: EtiquetaRepository,
    private readonly pacienteFindService: PacienteFindService,
    private readonly handledErrors: HandleErrors,
  ) {}

  async create(createEtiquetaDto: CreateEtiquetaDto): Promise<void> {
    await this.etiquetaRepository.create(createEtiquetaDto);
  }

  async asignarEtiquetas(asignarEtiquetaDto: AsignarEtiquetas): Promise<void> {
    const { idPaciente, tags } = asignarEtiquetaDto;
    const paciente = await this.pacienteFindService.verifyId(idPaciente);

    for (const tag of tags) {
      await paciente.updateOne({
        $addToSet: {
          etiquetas: new Types.ObjectId(tag._id),
        },
      });
    }
    await this.handledErrors.handleSendMessage('Etiqueta/s asignada/s');
  }
}
