import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { EstadoCitaFindService } from 'src/modules/estado-cita/services/find/find.service';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { PacienteFindService } from 'src/modules/pacientes/services/find/find.service';
import { CreateCitaDto } from '../../dto/create-cita.dto';
import {
  CITA_REPOSITORY,
  CitaRepository,
} from '../../repository/cita-repository';
import { CitaCreate } from './types/typesCreate';

@Injectable()
export class CitaCreateService implements CitaCreate {
  constructor(
    @Inject(CITA_REPOSITORY) private readonly citaRepository: CitaRepository,
    private readonly pacienteFindService: PacienteFindService,
    // private readonly servicioFindService: ServicioFindService,
    private readonly medicoFindService: MedicoFindService,
    private readonly estadoCitaFindService: EstadoCitaFindService,
    private readonly handledErrors: HandleErrors,
  ) {}
  async create(data: CreateCitaDto): Promise<void> {
    this.deleteDataCitasNull(data);
    const paciente = await this.pacienteFind(data.idPaciente);
    // const servicio = await this.servicioFind(data.servicio);
    const medico = await this.medicoFind(data.medico);
    const estadoCita = await this.estadoCitaFind(data.estado);

    const cita = await this.citaRepository.create({
      ...data,
      paciente: paciente._id,
      estado: estadoCita._id,
      medico: medico._id,
      // servicio: servicio.nombre,
    });

    await paciente.updateOne({
      $push: {
        citas: cita._id,
      },
    });
    this.handledErrors.handleSendMessage('Cita asignada correctamente');
  }
  // private async servicioFind(id: string) {
  //   return await this.servicioFindService.findById(id);
  // }
  private async estadoCitaFind(id: string) {
    return await this.estadoCitaFindService.findById(id);
  }
  private async pacienteFind(id: string) {
    return await this.pacienteFindService.verifyId(id);
  }
  private async medicoFind(id: string) {
    return await this.medicoFindService.findById(id);
  }
  private deleteDataCitasNull(data: CreateCitaDto) {
    delete data.dni;
    delete data.paciente;
  }
}
