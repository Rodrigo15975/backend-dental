import { Inject, Injectable } from '@nestjs/common';
import {
  SERVICIO_REPOSITORY,
  ServicioRepository,
} from '../../repository/servicio-repository';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { ServicioUpdate } from './types/typeUpdate';
import { UpdateServicioDto } from '../../dto/update-servicio.dto';
import { ServicioFindService } from '../find/find.service';

@Injectable()
export class ServicioUpdateService implements ServicioUpdate {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly servicioRepository: ServicioRepository,
    private readonly servicioFind: ServicioFindService,
    private readonly handleErros: HandleErrors,
  ) {}
  async update(id: string, updateServiceDto: UpdateServicioDto): Promise<void> {
    await this.servicioFind.findById(id);
    await this.servicioRepository.update(id, updateServiceDto);
    this.handleErros.handleSendMessage('Actualización exitosa');
  }
}
