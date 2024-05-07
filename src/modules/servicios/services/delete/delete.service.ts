import { Inject, Injectable } from '@nestjs/common';
import { ServicioDelete } from './types/typesDelete';
import {
  SERVICIO_REPOSITORY,
  ServicioRepository,
} from '../../repository/servicio-repository';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { ServicioFindService } from '../find/find.service';

@Injectable()
export class ServicioDeleteService implements ServicioDelete {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly servicioRepository: ServicioRepository,
    private readonly findServicios: ServicioFindService,
    private readonly handleErros: HandleErrors,
  ) {}
  async delete(id: string): Promise<void> {
    await this.findServicios.findById(id);
    await this.servicioRepository.delete(id);
    this.handleErros.handleSendMessage('Eliminación exitosa');
  }
}
