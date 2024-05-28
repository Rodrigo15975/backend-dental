import { Inject, Injectable } from '@nestjs/common';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { CreateRecetaDto } from '../../dto/create-receta.dto';
import {
  RECETA_REPOSITORY,
  RecetaRepository,
} from '../../repository/receta-repository';
import { RecetaCreate } from './types/typesCreate';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class RecetaCreateService implements RecetaCreate {
  constructor(
    @Inject(RECETA_REPOSITORY)
    private readonly recetaRepository: RecetaRepository,
    private readonly medicoFindServices: MedicoFindService,
    private readonly handledErrors: HandleErrors,
  ) {}

  async create(createRecetaDto: CreateRecetaDto): Promise<void> {
    const { medico: id } = createRecetaDto;
    const medico = await this.medicoFindServices.findByIdMedico(id);
    await this.recetaRepository.create({
      ...createRecetaDto,
      medico: medico._id,
    });
    this.handledErrors.handleSendMessage('Receta agregada correctamente');
  }
}
