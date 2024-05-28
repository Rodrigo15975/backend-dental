import { Inject, Injectable } from '@nestjs/common';
import { UpdatePacienteDto } from '../../dto/update-paciente.dto';
import {
  PACIENTE_REPOSITORY,
  PacienteRepository,
} from '../../repository/paciente-repository';
import { PacienteUpdate } from './types/typesUpdate';
import { PacienteFindService } from '../find/find.service';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class PacienteUpdateService implements PacienteUpdate {
  constructor(
    @Inject(PACIENTE_REPOSITORY)
    private readonly pacienteRepository: PacienteRepository,
    private readonly pacienteFindService: PacienteFindService,
    private readonly handledErrors: HandleErrors,
  ) {}

  async update(
    id: string,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<void> {
    // this.deleteEmpty(updatePacienteDto);

    delete updatePacienteDto.role;
    delete updatePacienteDto.mayorEdad;

    await this.compareData(id, updatePacienteDto);

    await this.pacienteRepository.update(id, updatePacienteDto);

    this.handledErrors.handleSendMessage('Paciente actualizado correctamente');
  }
  // Elimina vacio, normal agrega los datos, si falla algun error del paciente menor
  private deleteEmpty(updatePacienteDto: UpdatePacienteDto) {
    const { celular, email } = updatePacienteDto;
    if (celular === '') delete updatePacienteDto.celular;
    if (email === '') delete updatePacienteDto.email;
  }
  private async compareData(id: string, updatePacienteDto: UpdatePacienteDto) {
    const { email, celular } = updatePacienteDto;
    const paciente = await this.pacienteFindService.findById(id);

    if (email !== paciente.email) await this.checkEmail(email);
    if (celular !== paciente.celular) await this.checkCelular(celular);
  }
  private async checkEmail(email: string): Promise<void> {
    await this.pacienteFindService.findByExistingEmail(email);
  }
  private async checkCelular(celular: string): Promise<void> {
    await this.pacienteFindService.findByExistingCelular(celular);
  }
}
