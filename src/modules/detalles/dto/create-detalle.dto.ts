export class CreateDetallesDto {
  // trae el id del select
  estado_tratamiento: string;
  // trae el id del select
  medico: string;
  // trae el id del select
  servicio: string;
  // dato normal
  costo_servicio: string;
  fecha_atencion: string;
  costo_restante: string;
  monto_pagado: string;
}

export class CreateTratamientoDto extends CreateDetallesDto {
  comentarios: string;
  // vuelto_restante: string;
  costo_total: string;
  montoTotal: string;
  id: string;
  fecha_atencion: string;
}
