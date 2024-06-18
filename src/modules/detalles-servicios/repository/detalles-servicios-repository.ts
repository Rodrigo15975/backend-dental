import {
  CreateDetallesServicioDtoMayor,
  CreateDetallesServicioDtoMenor,
  CreateTratamientoDetallesServicioDto,
} from '../dto/create-detalles-servicio.dto';
import { DetallesServicio } from '../entities/detalles-servicio.entity';

export const DETALLES_SERVICIO_REPOSITORY = 'DetallesServiciosRepository';

export interface DetallesServiciosRepository {
  createDetallesPacienteMayor(
    data: CreateDetallesServicioDtoMayor,
  ): Promise<DetallesServicio>;

  createDetallesPacienteMenor(
    data: CreateDetallesServicioDtoMenor,
  ): Promise<DetallesServicio>;

  delete(id: string): Promise<void>;

  createTratamientoDetallesServicio(
    data: CreateTratamientoDetallesServicioDto,
  ): Promise<DetallesServicio>;
}
