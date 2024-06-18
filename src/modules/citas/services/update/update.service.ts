import { Inject, Injectable } from '@nestjs/common';
import { UpdateCitaDto, UpdateStatusCitaDto } from '../../dto/update-cita.dto';
import {
  CITA_REPOSITORY,
  CitaRepository,
} from '../../repository/cita-repository';
import { CitasUpdate } from './types/typesUpdate';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { CitaFindService } from '../find/find.service';
import { EstadoCitaFindService } from 'src/modules/estado-cita/services/find/find.service';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';

@Injectable()
export class CitasUpdateService implements CitasUpdate {
  constructor(
    @Inject(CITA_REPOSITORY) private readonly citaRepository: CitaRepository,
    private readonly handledErrors: HandleErrors,
    private readonly citaFindService: CitaFindService,
    private readonly estadoCitaFindService: EstadoCitaFindService,
    private readonly medicoFindService: MedicoFindService,
  ) {}

  async update(data: UpdateCitaDto, id: string): Promise<void> {
    const cita = await this.findCita(id);
    const medico = await this.medicoFindService.verifyId(data.medico);
    const estadoCita = await this.estadoCitaFindService.findById(data.estado);
    await this.citaRepository.update({ observacion: data.observacion }, id);
    await cita.updateOne({
      medico: medico._id,
      estado: estadoCita._id,
    });
    this.handledErrors.handleSendMessage('Cita actualizada');
  }

  async updateCitaChangeDate(
    { end, start }: UpdateCitaDto,
    id: string,
  ): Promise<void> {
    await this.changeCitaDate({ end, start }, id);
  }

  async updateCitaConfirmada(data: UpdateStatusCitaDto): Promise<void> {
    const { idDocStado } = data;
    const cita = await this.findCita(idDocStado);
    const { _id } = await this.estadoCitaFindService.findCitaConfirmada();
    await cita.updateOne({
      estado: _id,
    });
    this.handledErrors.handleSendMessage('Estado de la cita actualizada');
  }
  async updateCitaCancelar(data: UpdateStatusCitaDto): Promise<void> {
    const { idDocStado } = data;
    const cita = await this.findCita(idDocStado);
    const { _id } = await this.estadoCitaFindService.findCitaCancelada();
    await cita.updateOne({
      estado: _id,
    });
    this.handledErrors.handleSendMessage('Estado de la cita actualizada');
  }
  async updateCitaListaEspera(data: UpdateStatusCitaDto): Promise<void> {
    const { idDocStado } = data;
    const cita = await this.findCita(idDocStado);
    const { _id } = await this.estadoCitaFindService.findCitaListaEspera();
    await cita.updateOne({
      estado: _id,
    });
    this.handledErrors.handleSendMessage('Estado de la cita actualizada');
  }
  async updateCitaSala(data: UpdateStatusCitaDto): Promise<void> {
    const { idDocStado } = data;
    const cita = await this.findCita(idDocStado);

    const { _id } = await this.estadoCitaFindService.findCitaListaSala();
    await cita.updateOne({
      estado: _id,
    });
    this.handledErrors.handleSendMessage('Cambio exitoso');
  }
  async updateCitaAtendida(data: UpdateStatusCitaDto): Promise<void> {
    const { idDocStado } = data;
    const cita = await this.findCita(idDocStado);
    const { _id } = await this.estadoCitaFindService.findCitaAtendida();
    await cita.updateOne({
      estado: _id,
    });
    this.handledErrors.handleSendMessage('Sala libre');
  }

  private async changeCitaDate({ end, start }: UpdateCitaDto, id: string) {
    const cita = await this.findCita(id);
    if (cita.start !== start && cita.end !== end) {
      const docReprogramada =
        await this.estadoCitaFindService.findCitaReprogramada();

      await cita.updateOne({
        estado: docReprogramada._id,
      });
      await this.citaRepository.updateCitaChangeDate({ end, start }, id);
      this.handledErrors.handleSendMessage('Cita reprogramada');
    }
  }
  private async findCita(id: string) {
    return await this.citaFindService.findById(id);
  }
}
