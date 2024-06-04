import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import {
  CreateServicioDto,
  PropsCreateServicioDto,
} from '../../dto/create-servicio.dto';
import {
  SERVICIO_REPOSITORY,
  ServicioRepository,
} from '../../repository/servicio-repository';
import { ServiciosCreate } from './types/typesCreate';

@Injectable()
export class ServicioCreateService implements ServiciosCreate {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly servicioRepository: ServicioRepository,

    private readonly handleErrors: HandleErrors,
  ) {}

  async create(createServiceDto: CreateServicioDto): Promise<void> {
    const { servicios } = createServiceDto;
    await Promise.all(
      servicios.map(
        async (servicio) => await this.createServicesInDB(servicio),
      ),
    );
  }
  async createServicesInDB(servicios: PropsCreateServicioDto): Promise<void> {
    const { nombre } = servicios;
    const costo = this.createByDecimalCost(servicios.costo);
    await this.createVerifyExisting(nombre);
    await this.servicioRepository.create({ costo, nombre });
    this.handleErrors.handleSendMessage(
      'Servicos nuevos creados(duplicados inválidos)',
    );
  }
  private async createVerifyExisting(nombre: string): Promise<void> {
    const service = await this.servicioRepository.findByService(nombre);
    if (service)
      this.handleErrors.handleSendMessage(
        'Servicos nuevos creados(duplicados inválidos)',
      );
  }
  createByDecimalCost(costo: string): string {
    return parseFloat(costo).toFixed(2);
  }
}
