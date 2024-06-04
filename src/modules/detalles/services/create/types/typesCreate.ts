import { CreateDetallesDto } from 'src/modules/detalles/dto/create-detalle.dto';
import { Detalle } from 'src/modules/detalles/entities/detalle.entity';

export interface DetallesCreate {
  create(data: CreateDetallesDto): Promise<Detalle>;
}
