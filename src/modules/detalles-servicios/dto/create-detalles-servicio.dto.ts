import { CreateApoderadoDto } from 'src/modules/apoderado/dto/create-apoderado.dto';
import { CreateDetallesDto } from 'src/modules/detalles/dto/create-detalle.dto';

export class CreateDetallesServicioDtoMenor {
  detalles_servicio: CreateDetallesDto[];
  apoderado: CreateApoderadoDto;
  costo_restante: string;
  monto_pagado: string;
  vuelto_restante: string;
  comentarios: string;
  fecha_atencion: string;
  costo_total: string;
}

export class CreateDetallesServicioDtoMayor {
  detalles_servicio: CreateDetallesDto[];
  costo_restante: string;
  monto_pagado: string;
  vuelto_restante: string;
  comentarios: string;
  fecha_atencion: string;
  costo_total: string;
}
