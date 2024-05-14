import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { MedicoDeleteService } from 'src/modules/medicos/services/delete/delete.service';
import {
  SERVICIO_REPOSITORY,
  ServicioRepository,
} from '../../repository/servicio-repository';
import { ServicioFindService } from '../find/find.service';
import { ServicioDelete } from './types/typesDelete';

@Injectable()
export class ServicioDeleteService implements ServicioDelete {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly servicioRepository: ServicioRepository,
    private readonly findServicios: ServicioFindService,
    private readonly medicoDeleteService: MedicoDeleteService,
    private readonly handleErros: HandleErrors,
  ) {}
  async delete(id: string): Promise<void> {
    await this.findServicios.findById(id);

    await this.medicoDeleteService.deleteServicesForMedico(id);
    await this.servicioRepository.delete(id);

    this.handleErros.handleSendMessage('Servicio eliminado exitosamente');
  }

  async deleteServiceForMedico(id: string): Promise<void> {
    await this.medicoDeleteService.deleteServicesForMedico(id);
  }
}
