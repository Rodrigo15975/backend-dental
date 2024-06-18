import { CreateApoderadoDto } from 'src/modules/apoderado/dto/create-apoderado.dto';
import { CreateDetallesDto } from 'src/modules/detalles/dto/create-detalle.dto';

export class CreateDetallesServicioDtoMenor {
  detalles_servicio: CreateDetallesDto[];
  apoderado: CreateApoderadoDto;

  // vuelto_restante: string;
  comentarios: string;
  fecha_atencion: string;
  montoTotal: string;
  costo_total: string;
}

export class CreateDetallesServicioDtoMayor {
  detalles_servicio: CreateDetallesDto[];

  // vuelto_restante: string;
  comentarios: string;
  fecha_atencion: string;
  montoTotal: string;
  costo_total: string;
}

export class CreateTratamientoDetallesServicioDto {
  // vuelto_restante: string;
  comentarios: string;
  fecha_atencion: string;
  montoTotal: string;
  costo_total: string;
}

export class UpdateEstadoTratamientoo {
  estado_tratamiento: string;
  idDoc: string;
}
