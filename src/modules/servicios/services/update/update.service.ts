import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { UpdateServicioDto } from '../../dto/update-servicio.dto';
import {
  SERVICIO_REPOSITORY,
  ServicioRepository,
} from '../../repository/servicio-repository';
import { ServicioCreateService } from '../create/create.service';
import { ServicioFindService } from '../find/find.service';
import { ServicioUpdate } from './types/typeUpdate';

@Injectable()
export class ServicioUpdateService implements ServicioUpdate {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly servicioRepository: ServicioRepository,
    private readonly servicioFind: ServicioFindService,
    private readonly servicioCreate: ServicioCreateService,
    private readonly handleErros: HandleErrors,
  ) {}
  async update(id: string, updateServiceDto: UpdateServicioDto): Promise<void> {
    const costo = this.servicioCreate.createByDecimalCost(
      updateServiceDto.costo,
    );
    await this.servicioFind.findById(id);
    await this.servicioRepository.update(id, {
      ...updateServiceDto,
      costo,
    });
    this.handleErros.handleSendMessage('Actualización exitosa');
  }

  async addCountByService(id: string): Promise<void> {
    await this.servicioRepository.addCountByService(id);
  }
}
