import {
  CreateDetallesDto,
  CreateTratamientoDto,
} from 'src/modules/detalles/dto/create-detalle.dto';
import { Detalle } from 'src/modules/detalles/entities/detalle.entity';

export interface DetallesCreate {
  create(data: CreateDetallesDto, idPaciente: string): Promise<Detalle>;
  createTratamientoDetalles(
    data: CreateTratamientoDto,
    id: string,
    idPaciente: string,
  ): Promise<Detalle>;
}
