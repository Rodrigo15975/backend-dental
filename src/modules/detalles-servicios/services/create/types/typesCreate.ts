import {
  CreateDetallesServicioDtoMayor,
  CreateDetallesServicioDtoMenor,
} from 'src/modules/detalles-servicios/dto/create-detalles-servicio.dto';

export interface DetallesServicioCreate {
  createDetallesPacienteMayor(
    data: CreateDetallesServicioDtoMayor,
    id: string,
  ): Promise<void>;

  createDetallesPacienteMenor(
    data: CreateDetallesServicioDtoMenor,
    id: string,
  ): Promise<void>;
}
