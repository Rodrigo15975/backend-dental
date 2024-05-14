import {
  CreateServicioDto,
  PropsCreateServicioDto,
} from 'src/modules/servicios/dto/create-servicio.dto';

export interface ServiciosCreate {
  create(createServiceDto: CreateServicioDto): Promise<void>;
  createServicesInDB(servicios: PropsCreateServicioDto): Promise<void>;
}
