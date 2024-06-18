import { UpdateEstadoTratamientoo } from 'src/modules/detalles-servicios/dto/create-detalles-servicio.dto';

export interface DetallesUpdate {
  update(data: UpdateEstadoTratamientoo): Promise<void>;
}
