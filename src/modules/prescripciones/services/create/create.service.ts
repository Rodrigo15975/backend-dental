import { Inject, Injectable } from '@nestjs/common';
import { PrescripcionesCreate } from './types/typesCreate';
import { CreatePrescripcioneDto } from '../../dto/create-prescripcione.dto';
import {
  PRESCRIPCIONE_REPOSITORY,
  PrescripcionesRepository,
} from '../../repository/prescripcion-repository';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';

@Injectable()
export class PrescripcionesCreateService implements PrescripcionesCreate {
  constructor(
    @Inject(PRESCRIPCIONE_REPOSITORY)
    private readonly prescripcionesRepository: PrescripcionesRepository,
    private readonly medicoFindService: MedicoFindService,
    private readonly handledErrors: HandleErrors,
    private readonly pacienteFindServices: PacienteFindService,
  ) {}

  async create(
    createPrescripcioneDto: CreatePrescripcioneDto,
    idPaciente: string,
  ): Promise<void> {
    const { medico: id } = createPrescripcioneDto;

    const paciente = await this.pacienteFindServices.verifyId(idPaciente);

    const medico = await this.medicoFindService.findByIdMedico(id);

    const prescripcion = await this.prescripcionesRepository.create({
      ...createPrescripcioneDto,
      medico: medico._id,
    });
    await paciente.updateOne({
      $push: {
        prescripciones: prescripcion._id,
      },
    });
    this.handledErrors.handleSendMessage(
      'Prescripción registrada exitosamente..',
    );
  }
}
