import { Inject, Injectable } from '@nestjs/common';
import { CreateServicioDto } from '../../dto/create-servicio.dto';
import {
  SERVICIO_REPOSITORY,
  ServicioRepository,
} from '../../repository/servicio-repository';
import { ServicioFindService } from '../find/find.service';
import { ServiciosCreate } from './types/typesCreate';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class ServicioCreateService implements ServiciosCreate {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly servicioRepository: ServicioRepository,
    private readonly findServicio: ServicioFindService,
    private readonly handleErrors: HandleErrors,
  ) {}
  async create(createServiceDto: CreateServicioDto): Promise<void> {
    const { nombre } = createServiceDto;
    await this.findServicio.findByServiceExisting(nombre);
    await this.servicioRepository.create(createServiceDto);
    this.handleErrors.handleSendMessage('Creación exitosa');
  }
}
