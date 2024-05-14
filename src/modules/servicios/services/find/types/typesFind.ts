import { PropsCreateServicioForMedicoDto } from 'src/modules/servicios/dto/create-servicio.dto';
import { ServicioRepository } from 'src/modules/servicios/repository/servicio-repository';

export interface ServicioFind
  extends Omit<
    ServicioRepository,
    | 'addNewServicesForMedicoWithDni'
    | 'create'
    | 'delete'
    | 'update'
    | 'addCountByService'
  > {
  findGetServicesAllId(
    servicios: PropsCreateServicioForMedicoDto,
  ): Promise<PropsCreateServicioForMedicoDto>;
}
