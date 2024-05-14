import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { PropsCreateServicioForMedicoDto } from '../../dto/create-servicio.dto';
import { Servicio } from '../../entities/servicio.entity';
import {
  SERVICIO_REPOSITORY,
  ServicioRepository,
} from '../../repository/servicio-repository';
import { ServicioFind } from './types/typesFind';

@Injectable()
export class ServicioFindService implements ServicioFind {
  constructor(
    @Inject(SERVICIO_REPOSITORY)
    private readonly servicioRepository: ServicioRepository,
    private readonly handleErros: HandleErrors,
  ) {}
  async findById(id: string): Promise<Servicio> {
    const service = await this.servicioRepository.findById(id);
    if (!service)
      this.handleErros.handleErrorsNotFoundException(
        `El servicio con el id ${id} no existe`,
      );
    return service;
  }
  async findAllServices(): Promise<Servicio[]> {
    return await this.servicioRepository.findAllServices();
  }
  async findByService(nombre: string): Promise<Servicio> {
    const servicio = await this.servicioRepository.findByService(nombre);
    if (!servicio)
      this.handleErros.handleErrorsConflicException(
        `El servicio ${nombre} no está registrado`,
      );
    return servicio;
  }
  async findByServiceExisting(nombre: string): Promise<Servicio> {
    const servicio =
      await this.servicioRepository.findByServiceExisting(nombre);
    if (servicio)
      this.handleErros.handleErrorsConflicException(
        `El servicio ${nombre} ya está registrado`,
      );
    return servicio;
  }
  async findGetServicesAllId(
    servicios: PropsCreateServicioForMedicoDto,
  ): Promise<PropsCreateServicioForMedicoDto> {
    const results = await Promise.all(
      servicios.map(
        async (servicio) => await this.findByService(servicio.nombre),
      ),
    );
    const ids = results.map((servicios) => servicios._id);
    return ids;
  }
}
