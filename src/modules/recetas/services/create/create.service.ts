import { Inject, Injectable } from '@nestjs/common';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { CreateRecetaDto } from '../../dto/create-receta.dto';
import {
  RECETA_REPOSITORY,
  RecetaRepository,
} from '../../repository/receta-repository';
import { RecetaCreate } from './types/typesCreate';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';

@Injectable()
export class RecetaCreateService implements RecetaCreate {
  constructor(
    @Inject(RECETA_REPOSITORY)
    private readonly recetaRepository: RecetaRepository,
    private readonly medicoFindServices: MedicoFindService,
    private readonly handledErrors: HandleErrors,
    private readonly pacienteFindService: PacienteFindService,
  ) {}

  async create(
    createRecetaDto: CreateRecetaDto,
    idPaciente: string,
  ): Promise<void> {
    const { medico: id } = createRecetaDto;
    const paciente = await this.pacienteFindService.verifyId(idPaciente);

    const medico = await this.medicoFindServices.findByIdMedico(id);
    const receta = await this.recetaRepository.create({
      ...createRecetaDto,
      medico: medico._id,
    });

    await paciente.updateOne({
      $push: {
        recetaMedica: receta._id,
      },
    });
    this.handledErrors.handleSendMessage('Receta agregada correctamente');
  }
}
