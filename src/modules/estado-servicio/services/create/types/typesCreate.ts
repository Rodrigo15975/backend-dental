import { CreateEstadoServicioDto } from 'src/modules/estado-servicio/dto/create-estado-servicio.dto';
import { EstadoServicio } from 'src/modules/estado-servicio/entities/estado-servicio.entity';

export interface EstadoServicioCreate {
  create(
    createEstadoServicioDto: CreateEstadoServicioDto,
  ): Promise<EstadoServicio>;
}
